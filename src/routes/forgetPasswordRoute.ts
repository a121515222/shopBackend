import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { verifyMailTokenMiddleware } from "@/middlewares/verifyToken";
import { forgetPassword } from "@/controllers/forgetPasswordController";
import { forgetPasswordSwagger } from "@/swaggerConfig/forgetPasswordSwagger";
const router = Router();

router.post(
  "/forgetPassword",
  forgetPasswordSwagger,
  verifyMailTokenMiddleware,
  asyncErrorHandler(forgetPassword) as RequestHandler
);
export default router;
