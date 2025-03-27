import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn } from "@/middlewares/auth";
import { getChatMessageList } from "@/controllers/chatMessageController"
import {
  getChatMessageListSwagger
 } from "@/swaggerConfig/chatMessageSwagger";
const router = Router();

router.get(
  "/chatMessages",
  getChatMessageListSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getChatMessageList) as RequestHandler
);

export default router;
