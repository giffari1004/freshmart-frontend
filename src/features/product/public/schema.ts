import z from "zod";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../constans";
import { ProductImage } from "../constans";
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
export type getProductCatalogSchema = z.infer<typeof GET_CATALOG>;
