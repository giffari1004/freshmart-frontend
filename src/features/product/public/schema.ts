import z from "zod";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../constans";
import { ProductImage } from "../schema";
export const GET_CATALOG = z.object({
  storeId: z.string().uuid("Invalid store id"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  categoryId: z.string().uuid("Invalid category id").optional(),
  sortBy: z.enum(PRODUCT_SORT_BY).default("createdAt"),
  sortOrder: z.enum(PRODUCT_SORT_ORDER).default("desc"),
});
export interface Product {
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
}
export interface ProductDetail {
  id: string;
  name: string;
  description: string | null;
  category: {
    id: string;
    name: string;
  };
  price: number;
  stock: number;
  isOutOfStock: boolean;
  images: ProductImage[];
}
export type getProductCatalogSchema = z.infer<typeof GET_CATALOG>;
