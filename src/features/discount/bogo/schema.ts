import z from "zod";

export const CREATE_BOGO = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    productId: z.string().uuid("Invalid product id"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const UPDATE_BOGO = z
  .object({
    productId: z.string().uuid("Invalid product id").optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => (data.startDate && data.endDate ? data.endDate > data.startDate : true),
    { message: "End date must be after start date", path: ["endDate"] },
  );

export const GET_BOGO = z.object({
  storeId: z.string().uuid("Invalid store id").optional(),
  productId: z.string().uuid("Invalid product id").optional(),
  activeOnly: z.coerce.boolean().default(true),
});

export interface Bogo {
  id: string;
  storeId: string;
  productId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  product: { id: string; name: string };
  store: { id: string; name: string };
}

export type getBogoOutput = z.output<typeof GET_BOGO>;
export type createBogoInput = z.input<typeof CREATE_BOGO>;
export type createBogoOutput = z.output<typeof CREATE_BOGO>;
export type updateBogoOutput = z.output<typeof UPDATE_BOGO>;
export type updateBogoInput = z.input<typeof UPDATE_BOGO>;