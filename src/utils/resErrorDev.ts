import { type Response } from "express"
import { type CustomError } from "@/types/errors"

// 開發環境
const resErrorDev = (err: CustomError, res: Response) => {
  const statusCode = err.statusCode ?? 500 // 預設值為 500
  res.status(statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  })
}

export default resErrorDev
