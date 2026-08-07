import z from "zod";
import { CATEGORY_SORT_BY, CATEGORY_SORT_ORDER } from "./constans";
export const GET_ALL_CATEGORY = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  sortBy: z.enum(CATEGORY_SORT_BY).default("createdAt"),
  sortOrder: z.enum(CATEGORY_SORT_ORDER).default("desc"),
});
export const CREATE_CATEGORY = z.object({
  name: z.string().trim().min(1, "Category name is required"),
});
export const UPDATE_CATEGORY = z.object({
  name: z.string().trim().min(1).optional(),
});
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface CategoryMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}
export type createCategorySchema = z.infer<typeof CREATE_CATEGORY>;
export type getAllCategorySchema = z.infer<typeof GET_ALL_CATEGORY>;
export type updateCategorySchema = z.infer<typeof UPDATE_CATEGORY>;
