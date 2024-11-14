import type { NextFunction, Request, Response } from "express";
import type { UserType } from "@/types/userTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
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

export { getUsers };
