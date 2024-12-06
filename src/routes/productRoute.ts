import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  postUserProduct,
  getAllUserProducts,
  getProductById,
  updateUserProduct,
  deleteUserProduct
} from "@/controllers/productController";
import {
  postUserProductSwagger,
  getAllUserProductSwagger,
  getUserProductByIdSwagger,
  putUserProductSwagger,
  deleteUserProductSwagger
} from "@/swaggerConfig/productSwagger";
const router = Router();

router.post(
  "/product",
  postUserProductSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(postUserProduct) as RequestHandler
);
router.get(
  "/products/:userId",
  getAllUserProductSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getAllUserProducts) as RequestHandler
);
router.get(
  "/productById/:id",
  getUserProductByIdSwagger,
  asyncErrorHandler(getProductById) as RequestHandler
);
router.put(
  "/productById/:id",
  putUserProductSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(updateUserProduct) as RequestHandler
);
router.delete(
  "/productById/:id",
  deleteUserProductSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(deleteUserProduct) as RequestHandler
);
export default router;
