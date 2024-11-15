import jwt from "jsonwebtoken";
import type { LoginResData } from "@/types/logInTypes";

/**
 * 產生 JWT
 * @param payload 登入資料
 */
const generateJWT = (payload: LoginResData): string => {
  const key = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_TIME;

  if (!key || !expiresIn) {
    throw new Error("缺少必要環境變數");
  }

  return jwt.sign(payload, key, { expiresIn });
};
const generateJWTVerifyMail = (payload: string): string => {
  const key = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_TIME_VERIFY_EMAIL;

  if (!key || !expiresIn) {
    throw new Error("缺少必要環境變數");
  }

  return jwt.sign({ token: payload }, key, { expiresIn });
};
export { generateJWT, generateJWTVerifyMail };
