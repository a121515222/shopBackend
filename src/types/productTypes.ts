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
}
