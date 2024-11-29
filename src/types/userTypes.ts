import { type Types } from "mongoose";

export interface UserType {
  _id: Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  gender: string;
  rank: string;
  birthday: number | null;
  isVerify?: boolean;
  verifyToken?: string;
  address: string;
}
