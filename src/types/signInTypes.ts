import { type Types } from "mongoose";
export interface SignUpReqBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: "" | "female" | "male";
  birthday?: number | null;
  tel?: string;
  name: string;
}
