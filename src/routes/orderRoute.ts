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
  buyerGetOrder,
  sellerGetOrderList
} from "@/controllers/orderController";
import {
  buyerAddOrderSwagger,
  buyerEditOrderSwagger,
  sellerEditOrderSwagger,
  buyerDeleteOrderSwagger,
  buyerGetOrderListSwagger,
  buyerGetOrderSwagger,
  sellerGetOrderListSwagger
} from "@/swaggerConfig/orderSwagger";

const router = Router();

router.post(
  "/buyerAddOrder",
  buyerAddOrderSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerAddOrder) as RequestHandler
);

router.put(
  "/buyerEditOrder",
  buyerEditOrderSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerEditOrder) as RequestHandler
);

router.put(
  "/sellerEditOrder",
  sellerEditOrderSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(sellerEditOrder) as RequestHandler
);

router.delete(
  "/buyerDeleteOrder",
  buyerDeleteOrderSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerDeleteOrder) as RequestHandler
);

router.get(
  "/buyerGetOrderList",
  buyerGetOrderListSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerGetOrderList) as RequestHandler
);
router.get(
  "/buyerGetOrder/:orderId",
  buyerGetOrderSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(buyerGetOrder) as RequestHandler
);
router.get(
  "/sellerGetOrderList",
  sellerGetOrderListSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(sellerGetOrderList) as RequestHandler
);

export default router;
