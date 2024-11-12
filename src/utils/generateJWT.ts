import jwt from "jsonwebtoken";
import { type LoginResData } from "@/types/loginTypes";

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

export default generateJWT;
