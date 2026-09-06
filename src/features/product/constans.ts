export const PRODUCT_SORT_BY = ["name", "createdAt"] as const;
export const PRODUCT_SORT_ORDER = ["asc", "desc"] as const;
export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}
export interface Product {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
  weight: number;
  categoryId: string;
  createdAt: string;
  images: ProductImage[];
}
export interface ProductMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}
