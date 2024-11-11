import { type Response } from "express" // 引入 Response 類型，來自 express

// 定義一個泛型函數，泛型 T 用於 data 參數
function appSuccess<T> (httpStatus: number, message: string, data: T, res: Response): void {
  res.status(httpStatus).json({
    status: true,
    message,
    data
  })
}
export default appSuccess
