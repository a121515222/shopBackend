import { type Types } from "mongoose";
/**
 * 登入請求資料型別
 */
export interface LoginBody {
  account: string;
  password: string;
}

/**
 * 登入後回傳資料型別
 */
export interface LoginResData {
  userId: Types.ObjectId;
  email: string;
  name: string;
  gender: string;
  birthday: number | null;
  token: string;
  rank: string;
}
