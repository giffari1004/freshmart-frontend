import z from "zod";

export const GET_MONTHLY_REPORT = z.object({
  storeId: z.string().uuid("Invalid store ID").optional(),
  year: z.coerce.number().int().min(2026).optional(),
});
export const GET_PRODUCT_REPORT = z.object({
  storeId: z.string().uuid("Invalid store ID").optional(),
  year: z.coerce.number().int().min(2026).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
});
export const GET_CATEGORY_REPORT = z.object({
  storeId: z.string().uuid("Invalid store ID").optional(),
  year: z.coerce.number().int().min(2026).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
});
export type getProductReportSchema = z.infer<typeof GET_PRODUCT_REPORT>
export type getMonthlyReportSchema = z.infer<typeof GET_MONTHLY_REPORT>
export type getCategoryReportSchema = z.infer<typeof GET_CATEGORY_REPORT>
