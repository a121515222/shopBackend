import type { NextFunction, Request, Response } from "express";
import type { SignUpReqBody } from "@/types/signInTypes";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import validator from "validator";
import generateJWT from "@/utils/generateJWT";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import validatePassword from "@/utils/validatePassword";
/* 使用者註冊
 */
const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    username,
    email,
    password,
    confirmPassword,
    gender,
    birthday
  }: SignUpReqBody = req.body;
  // 檢查必填欄位
  const missingFields = checkMissingFields({
    username,
    email,
    password,
    confirmPassword
  });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }

  // 檢查 email 格式
  if (!validator.isEmail(email)) {
    appErrorHandler(400, "email 格式錯誤", next);
    return;
  }

  // 檢查密碼長度
  if (!validatePassword(password)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next);
    return;
  }

  // 檢查密碼是否相同
  if (password !== confirmPassword) {
    appErrorHandler(400, "兩次密碼不一致", next);
    return;
  }

  // 檢查帳號是否重複
  const isEmailExist = await User.findOne({ email: email.toLowerCase() });
  if (isEmailExist) {
    appErrorHandler(400, "帳號已存在", next);
    return;
  }
  // 處理生日
  let modifyBirthday;
  if (!birthday) {
    modifyBirthday = null;
  } else {
    modifyBirthday = birthday;
  }
  // 處理性別
  let modifyGender;
  if (!gender) {
    modifyGender = "";
  } else {
    modifyGender = gender;
  }

  // 密碼加密
  const hashPassword = await bcrypt.hash(password, 10);

  // 新增使用者
  const newUser = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashPassword,
    birthday: modifyBirthday,
    gender: modifyGender
  });

  // JWT payload
  const jwtPayload = {
    email,
    name: username
  };

  // 產生 token
  const token = generateJWT(jwtPayload);
  let resUserData = null;

  // Note: 開發環境下，回傳使用者資料
  if (process.env.NODE_ENV === "dev") {
    resUserData = await User.findOne({ "personalInfo.email": email }).select(
      "-personalInfo.password"
    );
  }
  // 回傳使用者資料
  res.status(201).json({
    status: "success",
    message: "註冊成功",
    token,
    user: {
      username: newUser.username,
      email: newUser.email,
      gender: newUser.gender,
      birthday: newUser.birthday
    }
  });
};

export { signIn };
