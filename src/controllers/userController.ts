import type { NextFunction, Request, Response } from "express";
import type { UserType } from "@/types/userTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import bcrypt from "bcrypt";

import {
  validateName,
  validatePassword,
  validateGender
} from "@/utils/validate";
import { User } from "@/models/user";

/* 取得使用者資料
 */
const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const users: UserType | null = await User.findById(id).select("-password");
  if (!users) {
    appErrorHandler(404, "No user found", next);
  } else {
    appSuccessHandler(200, "查詢成功", users, res);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, gender, newPassword } = req.body;
  const id = req.params.id ?? req.body.id;
  const updates: Partial<UserType> = {};
  if (!id) {
    appErrorHandler(400, "缺少使用者 ID", next);
    return;
  }
  if (username) {
    if (!validateName(username)) {
      appErrorHandler(400, "名字格式錯誤，只允許中文與英文", next);
      return;
    }
    updates.username = username;
  }
  if (gender !== undefined && gender !== "") {
    if (!validateGender(gender)) {
      appErrorHandler(400, "性別格式錯誤", next);
      return;
    }
    updates.gender = gender;
  }
  if (password) {
    if (!newPassword) {
      appErrorHandler(400, "缺少新密碼", next);
      return;
    }
    if (password === newPassword) {
      appErrorHandler(400, "新舊密碼不可相同", next);
      return;
    }
    if (!validatePassword(newPassword)) {
      appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next);
      return;
    }
    const user: UserType | null = await User.findById(id).select("+password");
    if (!user) {
      appErrorHandler(404, "查無使用者", next);
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      appErrorHandler(401, "密碼錯誤", next);
      return;
    } else {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashPassword;
    }
  }
  // 如果有更新內容，執行更新
  let upDateData;
  if (Object.keys(updates).length > 0) {
    upDateData = await User.findByIdAndUpdate(id, updates).select(
      "-password -logInVerifyToken -verifyToken"
    );
  }
  appSuccessHandler(200, "更新成功", upDateData, res);
};

export { getUsers, updateUser };
