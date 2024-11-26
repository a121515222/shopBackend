// src/middlewares/auth.ts
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import appErrorHandler from "@/utils/appErrorHandler";
import { User } from "@/models/user";
interface UserRequest extends Request {
  user: jwt.JwtPayload | string;
  token: string;
  id: string;
}
export const verifyToken = (token: string, next: NextFunction) => {
  const key = process.env.JWT_SECRET;
  if (!key) {
    appErrorHandler(500, "缺少必要環境變數", next);
    return null;
  }
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      appErrorHandler(401, "token 已過期", next);
    } else {
      appErrorHandler(401, "驗證失敗", next);
    }
    return null;
  }
};

const checkLogIn = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // 嘗試從 Cookie 獲取
  const cookieToken = req.cookies.authorization;
  // 嘗試從 Header 獲取
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const token = cookieToken || headerToken || authHeader; // 選擇一種方式,可以接受前頭沒有 Bearer 的 token
  if (!token) {
    appErrorHandler(401, "未提供有效的 Token", next);
    return;
  }
  const id = req.params.id ?? req.body.id;
  if (!token) {
    appErrorHandler(401, "未登入", next);
    return;
  }

  const decoded = verifyToken(token, next);
  if (decoded) {
    req.user = decoded;
    req.token = token;
    const logInVerifyToken = await User.findById(id).select("logInVerifyToken");
    if (!logInVerifyToken) {
      appErrorHandler(404, "查無使用者", next);
      return;
    }
    if (logInVerifyToken.logInVerifyToken !== token) {
      appErrorHandler(403, "token不符", next);
      return;
    }
    next();
  }
};

const checkAdmin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id ?? req.body.id;
  const checkUser = await User.findById(id).select(
    "rank isVerify logInVerifyToken"
  );
  if (!checkUser) {
    appErrorHandler(404, "查無使用者", next);
    return;
  }
  if (!checkUser.isVerify) {
    appErrorHandler(403, "信箱未驗證", next);
  }
  if (checkUser.logInVerifyToken !== req.token) {
    appErrorHandler(403, "token不符", next);
  }
  if (checkUser.rank === "admin") {
    next();
  } else {
    appErrorHandler(403, "權限不足", next);
  }
};

export { checkLogIn, checkAdmin };
