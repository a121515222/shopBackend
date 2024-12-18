import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn } from "@/middlewares/auth";
import {
  postUserAddCart,
  getUserCart,
  putUserCart,
  deleteCart,
  postCouponDiscount
} from "@/controllers/cartController";
import {
  postUserAddCartSwagger,
  getUserCartSwagger,
  putUserCartSwagger,
  deleteUserCartSwagger,
  postCouponCartSwagger
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
router.delete(
  "/cart",
  deleteUserCartSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(deleteCart) as RequestHandler
);
router.post(
  "/cartUsedCoupon",
  postCouponCartSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(postCouponDiscount) as RequestHandler
);
export default router;
