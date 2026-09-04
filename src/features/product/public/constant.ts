import { ProductImage } from "../constans";

export interface Product {
  product: {
    id: string;
    name: string;
    description: string | null;
    basePrice: number;
    weight: number;
    categoryId: string;
    category: {
      id: string;
      name: string;
    };
    createdAt: string;
    images: ProductImage[];
  };
}
export interface ProductDetail {
  id: string;
  storeProductId:string
  name: string;
  description: string | null;
  category: string;
  price: number;
  stock: number;
  isOutOfStock: boolean;
  images: ProductImage[];
}
