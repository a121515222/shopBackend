import { Request, Response, NextFunction, Router } from "express";
import { type RequestHandler, type Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { signin } from "@/controllers/signInController";
import {
  login,
  logOut,
  loginCheckResponse
} from "@/controllers/logInController";
import { signUpSwagger } from "@/swaggerConfig/signInSwagger";
import { logInSwagger, logOutSwagger } from "@/swaggerConfig/logInSwagger";
import { checkLogIn } from "@/middlewares/auth";
import googleService from "@/services/google";
const router = Router();

router.post("/logIn", logInSwagger, asyncErrorHandler(login) as RequestHandler);
router.post(
  "/logOut",
  logOutSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(logOut) as RequestHandler
);
router.post(
  "/signIn",
  signUpSwagger,
  asyncErrorHandler(signin) as RequestHandler
);
router.post(
  "/logInCheck",
  checkLogIn as Handler,
  asyncErrorHandler(loginCheckResponse) as RequestHandler
);

router.get(
  "/google",
  asyncErrorHandler(googleService.googleAuthenticate) as RequestHandler
);
router.get(
  "/google/callback",
  asyncErrorHandler(googleService.googleCallback) as RequestHandler
);

export default router;
