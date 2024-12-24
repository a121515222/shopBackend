import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  buyerAddOrder,
  buyerEditOrder,
  sellerEditOrder,
  buyerDeleteOrder,
  buyerGetOrderList,
  sellerGetOrderList
} from "@/controllers/orderController";
import {
  buyerAddOrderSwagger,
  buyerEditOrderSwagger,
  sellerEditOrderSwagger,
  buyerDeleteOrderSwagger,
  buyerGetOrderListSwagger,
  sellerGetOrderListSwagger
} from "@/swaggerConfig/orderSwagger";

const router = Router();

router.post(
  "/buyerAddOrder",
  checkLogIn as Handler,
  buyerAddOrderSwagger,
  asyncErrorHandler(buyerAddOrder) as RequestHandler
);

router.put(
  "/buyerEditOrder",
  checkLogIn as Handler,
  buyerEditOrderSwagger,
  asyncErrorHandler(buyerEditOrder) as RequestHandler
);

router.put(
  "/sellerEditOrder",
  checkLogIn as Handler,
  sellerEditOrderSwagger,
  asyncErrorHandler(sellerEditOrder) as RequestHandler
);

router.delete(
  "/buyerDeleteOrder",
  checkLogIn as Handler,
  buyerDeleteOrderSwagger,
  asyncErrorHandler(buyerDeleteOrder) as RequestHandler
);

router.get(
  "/buyerGetOrderList",
  checkLogIn as Handler,
  buyerGetOrderListSwagger,
  asyncErrorHandler(buyerGetOrderList) as RequestHandler
);

router.get(
  "/sellerGetOrderList",
  checkLogIn as Handler,
  sellerGetOrderListSwagger,
  asyncErrorHandler(sellerGetOrderList) as RequestHandler
);

export default router;
