import { type Request, type Response, type NextFunction } from "express";
import { User } from "@/models/user";
import appErrorHandler from "@/utils/appErrorHandler";

const shouldSendVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const user = await User.findById(id).select(
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
export { shouldSendVerifyToken };
