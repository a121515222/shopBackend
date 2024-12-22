import type { NextFunction, Request, Response } from "express";
import appSuccessHandler from "@/utils/appSuccessHandler";
import appErrorHandler from "@/utils/appErrorHandler";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { generateVerificationCode } from "@/utils/generateVerifyCode";
import googleService from "@/services/google";
// 驗證驗證碼
const verifyMailToken = async (
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
      const result = await User.findByIdAndUpdate(
        { _id: id },
        {
          isVerify: true
        },
        { new: true }
      ).select("-password, -verifyToken");

      appSuccessHandler(200, "驗證成功", result, res);
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      appErrorHandler(400, "驗證碼已過期", next);
    }
    appErrorHandler(400, "無效的驗證碼", next);
  }
};
const handleSendVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const account = req.body.account;
  const user = await User.findOne({ email: account }).select(
    "sendVerifyTokenDate sendVerifyTokenCount email isVerify _id"
  );
  if (!user) {
    appErrorHandler(404, "查無使用者", next);
    return;
  }
  const now = new Date();
  const offsetHours = -8; // 時區偏移（減去 8 小時） 因為mongoDB的時間是UTC+0
  const adjustedTime = new Date(now.getTime() + offsetHours * 60 * 60 * 1000);
  const sendVerifyTokenTime = user.sendVerifyTokenTime || new Date(0); // 預設為1970
  const sendVerifyTokenCount = user.sendVerifyTokenCount || 0;
  // 計算 24 小時內是否超過次數限制
  const timeDiff = now.getTime() - sendVerifyTokenTime.getTime();
  const isWithin24Hours = timeDiff <= 24 * 60 * 60 * 1000;
  if (!isWithin24Hours) {
    // 如果已超過24小時，重置計數
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $inc: { sendVerifyTokenCount: 1 },
        $set: { sendVerifyTokenTime: adjustedTime.toISOString() }
      }
    );
  } else {
    if (sendVerifyTokenCount <= 3) {
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $inc: { sendVerifyTokenCount: 1 }
        }
      );
    } else {
      appErrorHandler(429, "超過發送次數限制", next);
      return;
    }
  }

  const email = user.email;
  const id = user._id.toString();
  const verifyToken = await generateVerificationCode(id);

  const sendMailResult = await googleService.sendMail(
    email,
    { id, verifyToken },
    user.isVerify
  );

  if (sendMailResult) {
    appSuccessHandler(
      201,
      "寄送驗證碼成功",
      { info: "請至信箱收取驗證信", sendVerifyTokenTime, sendVerifyTokenCount },
      res
    );
  } else {
    appErrorHandler(500, "驗證碼發送失敗", next);
  }
};
export { verifyMailToken, handleSendVerifyToken };
