import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { getUsers, updateUser } from "@/controllers/userController";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  userDateSwagger,
  userUpdateSwagger,
  userDateAdminSwagger
} from "@/swaggerConfig/userSwagger";
const router = Router();

router.get(
  "/admin/user/:userId",
  userDateSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getUsers) as RequestHandler
);
router.put(
  "/admin/user",
  userUpdateSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(updateUser) as RequestHandler
);
router.get(
  "/user-admin/:userId",
  userDateAdminSwagger,
  checkLogIn as Handler,
  checkAdmin as Handler,
  asyncErrorHandler(getUsers) as RequestHandler
);
export default router;
