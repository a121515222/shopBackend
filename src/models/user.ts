import { Schema, model, type Types } from "mongoose";
interface IUserSchema {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  gender: string;
  birthday: number;
}

const userSchema = new Schema<IUserSchema>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gender: {
      type: String,
      enum: ["female", "male", ""], // 使用枚舉限制性別的值
      default: ""
    },
    birthday: { type: Number, default: null }
  },
  { versionKey: false, timestamps: true }
);

const User = model<IUserSchema>("User", userSchema);

export { User, type IUserSchema };
