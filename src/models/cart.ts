import { Schema, model, type Types } from "mongoose";
import type { ProductCartType } from "@/types/productTypes";

interface CartSchema {
  userId: Types.ObjectId;
  sellerId: Types.ObjectId;
  couponId: Types.ObjectId | null;
  totalPrice: number;
  productList: ProductCartType[];
  isUsedCoupon: boolean;
}
const cartSchema = new Schema<CartSchema>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },
    couponId: { type: Schema.Types.ObjectId, default: null },
    totalPrice: { type: Number, default: 0 },
    isUsedCoupon: { type: Boolean, default: false },
    productList: {
      type: [
        new Schema<ProductCartType>({
          productId: String,
          num: Number,
          title: String,
          price: Number,
          discount: Number,
          imageUrl: String,
          unit: String,
          productSellPrice: Number
        })
      ],
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

const Cart = model<CartSchema>("Cart", cartSchema);

export { Cart, type CartSchema };
