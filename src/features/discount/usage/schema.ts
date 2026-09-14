import z from "zod/v3";

export const DISCOUNT_USAGE = z.object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().default(10),
      storeId: z.string().uuid().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["createdAt", "amountDeducted"]).default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).default("desc"),
    })
export type discountUsageSchemaType = z.infer<typeof DISCOUNT_USAGE>