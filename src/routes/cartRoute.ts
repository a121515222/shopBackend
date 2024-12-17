import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn } from "@/middlewares/auth";
import {
  postUserAddCart,
  getUserCart,
  putUserCart,
  deleteCart
} from "@/controllers/cartController";
import {
  postUserAddCartSwagger,
  getUserCartSwagger,
  putUserCartSwagger
} from "@/swaggerConfig/cartSwagger";

const router = Router();

router.post(
  "/cart",
  postUserAddCartSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(postUserAddCart) as RequestHandler
);
router.get(
  "/cart",
  getUserCartSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getUserCart) as RequestHandler
);
router.put(
  "/cart",
  putUserCartSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(putUserCart) as RequestHandler
);
export default router;
