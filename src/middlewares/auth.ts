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

const checkLogIn = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ?? req.params.token;

  if (!token) {
    appErrorHandler(401, "未登入", next);
    return;
  }

  const decoded = verifyToken(token, next);
  if (decoded) {
    req.user = decoded;
    req.token = token;
    next();
  }
};

const checkAdmin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const checkUserRank = await User.findById(id).select("rank");
  if (!checkUserRank) {
    appErrorHandler(404, "查無使用者", next);
    return;
  }
  if (checkUserRank.rank === "admin") {
    next();
  } else {
    appErrorHandler(403, "權限不足", next);
  }
};

export { checkLogIn, checkAdmin };
