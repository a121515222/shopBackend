import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import { buyerAddComment } from "@/controllers/commentController";
import { buyerAddCommentSwagger } from "@/swaggerConfig/commentSwagger";

const router = Router();

router.post(
  "/comment",
  buyerAddCommentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerAddComment) as RequestHandler
);

export default router;
