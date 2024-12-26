import { Schema, model, type Types } from "mongoose";
import type { ProductCartType } from "@/types/productTypes";

interface OrderSchema {
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  cartId: Types.ObjectId;
  productList: ProductCartType[];
  isPaid: boolean;
  totalPrice: number;
  status: string;
  address: string;
  tel: string;
  username: string;
  email: string;
  paidDate: Date | string | number | null;
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
const orderSchema = new Schema<OrderSchema>(
  {
    buyerId: { type: Schema.Types.ObjectId, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },
    cartId: { type: Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    status: { type: String, required: true },
    paidDate: { type: Date, default: null },
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
