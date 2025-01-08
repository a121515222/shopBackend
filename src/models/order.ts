import { Schema, model, type Types } from "mongoose";
import type { ProductCartType } from "@/types/productTypes";

interface OrderSchema {
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  cartId: Types.ObjectId;
  couponId: Types.ObjectId;
  productList: ProductCartType[];
  isPaid: boolean;
  isCommented: boolean;
  paidMethod: string;
  paidDate: Date | string | number | null;
  totalPrice: number;
  status: string;
  address: string;
  tel: string;
  username: string;
  email: string;
  buyerMessage: string;
}
const orderStatus = [
  "unpaid",
  "paid",
  "shipped",
  "confirmed",
  "completed",
  "cancelled"
];
const paidMethodConfig = ["creditCard", "transfer", "cashOnDelivery"];
const orderSchema = new Schema<OrderSchema>(
  {
    buyerId: { type: Schema.Types.ObjectId, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },
    cartId: { type: Schema.Types.ObjectId, required: true },
    couponId: { type: Schema.Types.ObjectId, default: null },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isCommented: { type: Boolean, default: false },
    status: { type: String, required: true },
    paidDate: { type: Date, default: null },
    paidMethod: { type: String, default: "" },
    address: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    buyerMessage: { type: String, default: "" },
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

const Order = model<OrderSchema>("Order", orderSchema);

export { Order, type OrderSchema };
