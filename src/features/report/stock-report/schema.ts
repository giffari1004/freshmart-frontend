import z from "zod";
export const GET_MONTHLY_SUMMARY = {
  storeId: z.string().uuid("Invalid store ID").optional(),
  year: z.coerce.number().int().min(2026).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
};
export const GET_STOCK_DETAIL = {
  storeId: z.string().uuid("Invalid store ID").optional(),
  productId: z.string().uuid("Invalid product ID").optional(),
  year: z.coerce.number().int().min(2026).optional(),
  month: z.coerce.number().int().min(1).max(12),
};
export type getMonthlySummarySchema = z.infer<typeof GET_MONTHLY_SUMMARY>
export type getStockDetailSchema = z.infer<typeof GET_STOCK_DETAIL>
