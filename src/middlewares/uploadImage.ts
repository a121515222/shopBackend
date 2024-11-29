import multer from "multer"
import { type Request, type Response, type NextFunction } from "express"
import appErrorHandler from "@/utils/appErrorHandler"

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("只允許上傳圖片"))
      return
    }
    cb(null, true)
  }
})

export const uploadSingleFile = (req: Request, res: Response, next: NextFunction) => {
  const uploadHandler = upload.single("image")

  uploadHandler(req, res, (err: unknown) => {
    if (err instanceof Error) {
      console.error(err)
      appErrorHandler(422, err.message, next)
      return
    }

    if (err instanceof multer.MulterError) {
      console.error(err)
      appErrorHandler(500, err.message, next)
      return
    }

    next()
  })
}

export const uploadMultipleFiles = (req: Request, res: Response, next: NextFunction) => {
  const uploadHandler = upload.array("images", 10)

  uploadHandler(req, res, (err: unknown) => {
    if (err instanceof Error) {
      console.error(err)
      appErrorHandler(422, err.message, next)
      return
    }

    if (err instanceof multer.MulterError) {
      console.error(err)
      appErrorHandler(500, err.message, next)
      return
    }

    next()
  })
}
