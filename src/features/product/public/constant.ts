import { ProductImage } from "../constans";

export interface Product {
  product: {
    id: string;
    slug: string;
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
    discounts: {
      type: string;
      valueType: string;
      value: number;
    }[];
  };
}
export interface ProductDetail {
  id: string;
  slug: string;
  storeProductId: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  stock: number;
  isOutOfStock: boolean;
  images: ProductImage[];
  discounts: {
    type: string;
    valueType: string;
    value: number;
  }[];
}
