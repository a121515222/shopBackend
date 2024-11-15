import { Request, Response, NextFunction, Router } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { verifyMailToken } from "@/controllers/verifyMailTokenController";
import type { RequestHandler, Handler } from "express";
const router = Router();
router.post(
  "/verifyToken/:id/:Token",
  asyncErrorHandler(verifyMailToken) as RequestHandler
);

export default router;
