import { Schema, model, type Types } from "mongoose";
interface ProductSchema {
  userId: Types.ObjectId;
  title: string;
  description: string;
  price: number | null;
  discount: number;
  imagesUrl: string[];
  imageUrl: string;
  category: string[];
  tag: string[];
  content: string;
  unit: string;
}
const productSchema = new Schema<ProductSchema>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, default: null },
    discount: { type: Number, default: 0 },
    imagesUrl: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    category: { type: [String], default: [] },
    content: { type: String, default: "" },
    tag: { type: [String], default: [] },
    unit: { type: String, default: "" }
  },
  { versionKey: false, timestamps: true }
);
const Product = model<ProductSchema>("Product", productSchema);

export { Product, ProductSchema };
