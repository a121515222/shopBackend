import { Schema, model, type Types } from "mongoose";
interface IUserSchema {
  email: string;
  tel: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  address: string;
  gender: string;
  birthday: number;
  rank: string;
  isVerify: boolean;
  verifyToken: string;
  sendVerifyTokenTime: Date;
  sendVerifyTokenCount: number;
  logInVerifyToken: string;
  bankAccount: string;
  averageScore: number;
  commentCount: number;
}

const userSchema = new Schema<IUserSchema>(
  {
    email: { type: String, required: true, unique: true },
    tel: { type: String, default: "", require: true },
    address: { type: String, default: "" },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gender: {
      type: String,
      enum: ["female", "male", ""],
      default: ""
    },
    birthday: { type: Number, default: null },
    rank: { type: String, default: "normal" },
    isVerify: { type: Boolean, default: false },
    verifyToken: { type: String, default: "" },
    sendVerifyTokenTime: { type: Date, default: null },
    sendVerifyTokenCount: { type: Number, default: 0 },
    logInVerifyToken: { type: String, default: "" },
    bankAccount: { type: String, default: "" },
    averageScore: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 }
  },
  { versionKey: false, timestamps: true }
);

const User = model<IUserSchema>("User", userSchema);

export { User, IUserSchema };
