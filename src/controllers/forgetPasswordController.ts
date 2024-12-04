import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { validatePassword } from "@/utils/validate";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
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
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await User.findByIdAndUpdate(id, { password: hashPassword });
    appSuccessHandler(200, "密碼更新成功", null, res);
  } catch (error) {
    appErrorHandler(500, "密碼更新失敗", next);
  }
};

export { forgetPassword };
