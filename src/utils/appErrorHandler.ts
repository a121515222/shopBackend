import { type NextFunction } from "express" // 引入 NextFunction 類型，來自 express

interface CustomError extends Error {
  statusCode?: number
  isOperational?: boolean
}

const appError = (httpStatus: number, errMessage: string, next: NextFunction): void => {
  const error = new Error(errMessage) as CustomError
  error.statusCode = httpStatus
  error.isOperational = true
  next(error)
}

export default appError
