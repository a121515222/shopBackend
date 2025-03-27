import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn } from "@/middlewares/auth";
import { getConversationList
 } from "@/controllers/conversationController";
import {
  getConversationListSwagger
 } from "@/swaggerConfig/conversationSwagger";
const router = Router();

router.get(
  "/conversations",
  getConversationListSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getConversationList) as RequestHandler
);
export default router;