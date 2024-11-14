import { Request, Response, NextFunction, Router } from "express";
import { type RequestHandler, type Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { signin } from "@/controllers/signInController";
import { login } from "@/controllers/logInController";
import { signUpSwagger } from "@/swaggerConfig/signInSwagger";
import { logInSwagger } from "@/swaggerConfig/logInSwagger";
const router = Router();

router.post("/logIn", logInSwagger, asyncErrorHandler(login) as RequestHandler);
router.post(
  "/signIn",
  signUpSwagger,
  asyncErrorHandler(signin) as RequestHandler
);

export default router;
