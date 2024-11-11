import { type Response } from "express"
import { type CustomError } from "@/types/errors"

// 正式環境
const resErrorProd = (err: CustomError, res: Response) => {
  const statusCode = err.statusCode ?? 500 // 預設值為 500
  if (err.isOperational) { // 如果可操作的錯誤
    res.status(statusCode).json({
      message: err.message
    })
  } else {
    console.error("[server]：出現系統錯誤", err)
    res.status(500).json({
      status: "error",
      message: "系統錯誤，請稍後再試！"
    })
  }
}

export default resErrorProd
