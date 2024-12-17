import { Schema, model, type Types } from "mongoose";

interface CouponSchema {
  userId: Types.ObjectId;
  code: string;
  discount: number;
  expireDate: Date;
  isPublic: boolean;
  couponNum: number;
}

const CouponSchema = new Schema<CouponSchema>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    code: { type: String, required: true },
    discount: { type: Number, default: 0 },
    expireDate: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: false },
    couponNum: { type: Number, default: 0 }
  },
  { versionKey: false, timestamps: true }
);

const Coupon = model<CouponSchema>("Coupon", CouponSchema);

export { Coupon, CouponSchema };
