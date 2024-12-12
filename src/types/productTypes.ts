export interface ProductType {
  userId: string;
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
}

export interface ProductCartType {
  productId: string;
  title: string;
  price: number;
  discount: number;
  imageUrl: string;
  unit: string;
  num: number;
}
