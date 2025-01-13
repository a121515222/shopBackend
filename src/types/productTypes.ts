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
  productStatus: string;
  num: number;
}

export interface ProductCartType {
  productId: string;
  title: string;
  price: number;
  discount: number;
  imageUrl: string;
  unit: string;
  num: number;
  productSellPrice: number;
}
