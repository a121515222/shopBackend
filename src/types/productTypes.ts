import type { Types } from "mongoose";
export interface ProductType {
  _id: Types.ObjectId;
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
  productStatus: number;
  num: number;
}
