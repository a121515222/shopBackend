import type { NextFunction, Request, Response } from "express";
import type { LoginResData, LoginBody } from "@/types/logInTypes";
import type { UserType } from "@/types/userTypes";
// import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import validator from "validator";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { validatePassword } from "@/utils/validate";
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

  // 檢查帳號是否存在與是否通過驗證
  const user: UserType | null = await User.findOne({
    email: modifyAccount
  }).select("+password +isVerify");
  if (!user) {
    appErrorHandler(400, "登入失敗，帳號不存在", next);
    return;
  }
  if (!user.isVerify) {
    appErrorHandler(400, "登入失敗，帳號尚未驗證", next);
    return;
  }
  // 檢查密碼是否正確 compare(輸入密碼, 加密後密碼)
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

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
  const logInToken = await User.findByIdAndUpdate(
    { _id: user._id },
    { logInVerifyToken: token }
  ).select("logInVerifyToken");

  jwtPayload = {
    ...jwtPayload,
    token
  };
  if (!logInToken) {
    appErrorHandler(500, "登入失敗", next);
    return;
  } else {
    res.clearCookie("authorization", {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "none",
      domain: `${
        process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN
      }`
    });
    appSuccessHandler(200, "登入成功", jwtPayload, res);
  }
};
const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId ?? req.body.userId;
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { logInVerifyToken: "" }
  );
  if (!user) {
    appErrorHandler(404, "查無使用者", next);
    return;
  }
  res.clearCookie("authorization", {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "none",
    domain: `${
      process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN
    }`
  });
  res.clearCookie("userId", {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "none",
    domain: `${
      process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN
    }`
  });
  appSuccessHandler(200, "登出成功", null, res);
};
const loginCheckResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  appSuccessHandler(200, "登入驗證成功", null, res);
};

export { login, logOut, loginCheckResponse };
