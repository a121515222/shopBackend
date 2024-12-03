import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "@/types/errors";
import resErrorDev from "@/utils/resErrorDev";
import resErrorProd from "@/utils/resErrorProd";

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;
  err.statusCode = statusCode; // 更新 err 內的 statusCode

  // 開發環境
  if (process.env.NODE_ENV === "dev") {
    resErrorDev(err, res);
    return;
  }

  // 正式環境
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    resErrorProd(err, res);
    return;
  }
  // 處理 MongoDB 資料類型轉換錯誤
  if (err.name === "CastError") {
    err.message = `無法找到符合條件的資料，ID: ${err.value}`;
    err.statusCode = 400; // 可以根據需求設定錯誤狀態碼
    err.isOperational = true;
    resErrorProd(err, res);
    return;
  }

  // 處理其他 MongoDB 驗證錯誤
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    resErrorProd(err, res);
    return;
  }
  // 預設為正式環境
  resErrorProd(err, res);
};

export default globalErrorHandler;
