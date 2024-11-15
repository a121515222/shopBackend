import type { NextFunction, Request, Response } from "express";
import type { LoginResData, LoginBody } from "@/types/logInTypes";
import type { UserType } from "@/types/userTypes";
import bcrypt from "bcrypt";
import validator from "validator";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import validatePassword from "@/utils/validatePassword";
import { generateJWT } from "@/utils/generateJWT";
import { User } from "@/models/user";
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { account, password }: LoginBody = req.body;
  let modifyAccount = account.toLowerCase();
  // 檢查必填欄位
  const missingFields = checkMissingFields({ modifyAccount, password });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }

  // 檢查 email 格式
  if (!validator.isEmail(modifyAccount)) {
    appErrorHandler(400, "email 格式錯誤", next);
    return;
  }

  // 檢查密碼長度
  if (!validatePassword(password)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next);
    return;
  }

  // 檢查帳號是否存在
  const user: UserType | null = await User.findOne({
    email: modifyAccount
  }).select("+password");
  if (!user) {
    appErrorHandler(400, "登入失敗，帳號不存在", next);
    return;
  }
  // 檢查密碼是否正確 compare(輸入密碼, 加密後密碼)
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    appErrorHandler(400, "登入失敗，密碼錯誤", next);
    return;
  }

  // JWT payload
  let jwtPayload: LoginResData = {
    userId: user._id,
    email: user.email,
    name: user.username,
    gender: user.gender,
    birthday: user.birthday,
    rank: user.rank,
    token: ""
  };

  // 產生 token
  const token = generateJWT(jwtPayload);

  jwtPayload = {
    ...jwtPayload,
    token
  };

  appSuccessHandler(200, "登入成功", jwtPayload, res);
};

export { login };
