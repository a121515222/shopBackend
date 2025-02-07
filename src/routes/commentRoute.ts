import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  buyerAddComment,
  sellerGetComment,
  buyerGetSellerComment
} from "@/controllers/commentController";
import {
  buyerAddCommentSwagger,
  sellerGetCommentSwagger,
  buyerGetSellerCommentSwagger
} from "@/swaggerConfig/commentSwagger";

const router = Router();

router.post(
  "/comment",
  buyerAddCommentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerAddComment) as RequestHandler
);

router.get(
  "/sellerGetComment",
  sellerGetCommentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(sellerGetComment) as RequestHandler
);

router.get(
  "/buyerGetSellerComment",
  buyerGetSellerCommentSwagger,
  asyncErrorHandler(buyerGetSellerComment) as RequestHandler
);

export default router;
