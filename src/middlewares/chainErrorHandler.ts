import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import appErrorHandler from "@/utils/appErrorHandler";
export const chainErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(";");
    appErrorHandler(400, errorMessages, next);
    return;
  }
  next();
};
