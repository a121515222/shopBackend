import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import {
  verifyMailToken,
  handleSendVerifyToken
} from "@/controllers/verifyTokenController";
import { shouldSendVerifyToken } from "@/middlewares/verifyToken";
import {
  verifyTokenSwagger,
  sendVerifyTokenSwagger
} from "@/swaggerConfig/verifyTokenSwagger";
const router = Router();
router.post(
  "/verifyMailToken",
  verifyTokenSwagger,
  asyncErrorHandler(verifyMailToken) as RequestHandler
);
router.post(
  "/sendVerifyToken/",
  sendVerifyTokenSwagger,
  shouldSendVerifyToken,
  asyncErrorHandler(handleSendVerifyToken) as RequestHandler
);
export default router;
