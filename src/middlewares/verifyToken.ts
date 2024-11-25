import { type Request, type Response, type NextFunction } from "express";
import { User } from "@/models/user";
import appErrorHandler from "@/utils/appErrorHandler";
import jwt from "jsonwebtoken";
const shouldSendVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const account = req.body.account;
  if (!account) {
    appErrorHandler(400, "缺少必要欄位account", next);
    return;
  }

  const user = await User.findOne({ email: account }).select(
    "sendVerifyTokenTime sendVerifyTokenCount"
  );
  if (!user) {
    appErrorHandler(404, "查無使用者", next);
    return;
  }
  const now = new Date();
  const sendVerifyTokenTime = user.sendVerifyTokenTime || new Date(0); // 預設為1970
  const sendVerifyTokenCount = user.sendVerifyTokenCount || 0;

  // 計算 24 小時內是否超過次數限制
  const timeDiff = now.getTime() - sendVerifyTokenTime.getTime();
  const isWithin24Hours = timeDiff <= 24 * 60 * 60 * 1000;
  if (!isWithin24Hours) {
    next();
  } else {
    if (sendVerifyTokenCount <= 3) {
      next();
    } else {
      appErrorHandler(429, "超過發送次數限制", next);
    }
  }
};

const verifyMailTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 解碼 token
  const id = req.body.id;
  const token = req.body.token;
  const key = process.env.JWT_SECRET;
  if (!key) {
    appErrorHandler(500, "缺少必要環境變數", next);
    return;
  }
  if (!id || !token) {
    appErrorHandler(400, "缺少token或id", next);
    return;
  }
  const storedCode = await User.findById(id).select("verifyToken");
  if (!storedCode) {
    appErrorHandler(404, "查無使用者", next);
  }
  try {
    const decoded = jwt.verify(token, key) as jwt.JwtPayload & { code: string };
    if (decoded.token === storedCode?.verifyToken) {
      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      appErrorHandler(400, "驗證碼已過期", next);
    }
    appErrorHandler(400, "無效的驗證碼", next);
  }
};

export { shouldSendVerifyToken, verifyMailTokenMiddleware };
