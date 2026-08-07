import z from "zod";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "./constans";
export const GET_ALL_PRODUCT = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  categoryId: z.string().uuid("Invalid category id").optional(),
  sortBy: z.enum(PRODUCT_SORT_BY).default("createdAt"),
  sortOrder: z.enum(PRODUCT_SORT_ORDER).default("desc"),
});
export const CREATE_PRODUCT = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().optional(),
  basePrice: z.coerce.number().positive("Base price must be greater than 0"),
  weight: z.coerce.number().int().positive("Weight must be greater than 0"),
  categoryId: z.string().uuid("Invalid category id"),
  images: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "At least one image is required",
    ),
});
export const UPDATE_PRODUCT = z.object({
  name: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  basePrice: z.coerce
    .number()
    .positive("Base price must be greater than 0")
    .optional(),
  weight: z.coerce
    .number()
    .int()
    .positive("Weight must be greater than 0")
    .optional(),
  categoryId: z.string().uuid("Invalid category id").optional(),
});
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
export type getAllProductSchema = z.infer<typeof GET_ALL_PRODUCT>;
export type createProductOutputSchema = z.output<typeof CREATE_PRODUCT>;
export type createProductInputSchema = z.input<typeof CREATE_PRODUCT>;
export type updateProductOutputSchema = z.output<typeof UPDATE_PRODUCT>;
export type updateProductInputSchema = z.input<typeof UPDATE_PRODUCT>;
