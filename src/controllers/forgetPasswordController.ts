import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { validatePassword } from "@/utils/validate";
import { User } from "@/models/user";
// import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import { isJWTExpired } from "@/utils/generateJWT";
const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const id = req.body.id;
  const token = req.body.token;
  if (!password || !confirmPassword) {
    appErrorHandler(400, "缺少必要欄位", next);
    return;
  }
  if (password !== confirmPassword) {
    appErrorHandler(400, "兩次密碼不一致", next);
    return;
  }
  // 檢查密碼長度
  if (!validatePassword(password)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next);
    return;
  }
  // 檢查 token 是否過期
  if (isJWTExpired(token)) {
    appErrorHandler(400, "token 已過期", next);
    return;
  }
  // 檢查token是否正確
  const storeToken = await User.findById(id).select("verifyToken");
  if (!storeToken) {
    appErrorHandler(500, "token出錯", next);
    return;
  }
  const key = process.env.JWT_SECRET;
  if (!key) {
    appErrorHandler(500, "缺少必要環境變數", next);
    return;
  }
  if (await bcryptjs.compare(token, storeToken.verifyToken)) {
    appErrorHandler(400, "無效的 token", next);
    return;
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  try {
    const result = await User.findByIdAndUpdate(id, { password: hashPassword });
    if (!result) {
      appErrorHandler(500, "密碼更新失敗", next);
      return;
    } else {
      appSuccessHandler(200, "密碼更新成功", null, res);
    }
  } catch (error) {
    appErrorHandler(500, "密碼更新失敗", next);
  }
};

export { forgetPassword };
