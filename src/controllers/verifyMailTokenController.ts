import type { NextFunction, Request, Response } from "express";
import appSuccessHandler from "@/utils/appSuccessHandler";
import appErrorHandler from "@/utils/appErrorHandler";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

// 驗證驗證碼
const verifyMailToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 解碼 token
  const id = req.params.id;
  const token = req.params.token;
  const key = process.env.JWT_SECRET;
  if (!key) {
    return appErrorHandler(500, "缺少必要環境變數", next);
  }
  const storedCode = await User.findById(id).select("verifyToken");
  const decoded = jwt.verify(token, key) as jwt.JwtPayload & { code: string };

  // 驗證是否一致
  if (decoded.code === storedCode?.verifyToken) {
    const result = await User.findByIdAndUpdate(id, { isVerify: true }).select(
      "-password, -verifyToken"
    );
    appSuccessHandler(200, "驗證成功", result, res);
  } else {
    appErrorHandler(400, "無效的驗證碼", next);
  }
};

export { verifyMailToken };
