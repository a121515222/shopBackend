import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { getUsers } from "@/controllers/userController";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  userDateSwagger,
  userDateAdminSwagger
} from "@/swaggerConfig/userSwagger";
const router = Router();

router.get(
  "/user/:id",
  userDateSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getUsers) as RequestHandler
);
router.get(
  "/user-admin/:id",
  userDateAdminSwagger,
  checkLogIn as Handler,
  checkAdmin as Handler,
  asyncErrorHandler(getUsers) as RequestHandler
);
export default router;
