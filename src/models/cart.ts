import { Schema, model, type Types } from "mongoose";
interface ProductCartType {
  productId: string;
  title: string;
  price: number;
  discount: number;
  imageUrl: string;
  unit: string;
  num: number;
  productSellPrice: number;
}
interface CartSchema {
  userId: Types.ObjectId;
  sellerId: Types.ObjectId;
  totalPrice: number;
  productList: ProductCartType[];
  isUsedCoupon: boolean;
}
const cartSchema = new Schema<CartSchema>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },
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

export { Cart, CartSchema };
