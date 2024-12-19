import type { RequestHandler, Handler } from "express";
import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn } from "@/middlewares/auth";
import {
  createCoupon,
  getUserCreateCoupon,
  getCouponById,
  putUserCoupon,
  deleteCoupon
} from "@/controllers/couponController";
import {
  createCouponSwagger,
  getUserCreateCouponSwagger,
  getCouponByIdSwagger,
  putUserCouponSwagger,
  deleteCouponSwagger
} from "@/swaggerConfig/couponSwagger";
const router = Router();

router.post(
  "/coupon",
  createCouponSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(createCoupon) as RequestHandler
);
router.get(
  "/coupons",
  getUserCreateCouponSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getUserCreateCoupon) as RequestHandler
);
router.get(
  "/coupon/:couponId",
  getCouponByIdSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getCouponById) as RequestHandler
);
router.put(
  "/coupon/:couponId",
  putUserCouponSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(putUserCoupon) as RequestHandler
);
router.delete(
  "/coupon/:couponId",
  deleteCouponSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(deleteCoupon) as RequestHandler
);
export default router;
