import type { RequestHandler, Handler } from "express";
import { uploadImage } from "@/services/firebase";
import { Request, Response, NextFunction, Router } from "express";
import { uploadSingleFile } from "@/middlewares/uploadImage";
import { checkLogIn } from "@/middlewares/auth";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
const router = Router();

router.post(
  "/uploadImage/:userId",
  checkLogIn as Handler,
  uploadSingleFile,
  asyncErrorHandler(uploadImage) as RequestHandler
);

export default router;
