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
  "/verifyToken/:id/:token",
  verifyTokenSwagger,
  asyncErrorHandler(verifyMailToken) as RequestHandler
);
router.post(
  "/sendVerifyToken/:id",
  sendVerifyTokenSwagger,
  shouldSendVerifyToken,
  asyncErrorHandler(handleSendVerifyToken) as RequestHandler
);
export default router;
