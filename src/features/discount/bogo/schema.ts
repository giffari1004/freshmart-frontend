import z from "zod";

export const CREATE_BOGO = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    productId: z.string().uuid("Invalid product id"),
    startDate: z.coerce.date("Start date is required"),
    endDate: z.coerce.date("End date is required"),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(data.startDate);
      startDate.setHours(0, 0, 0, 0);
      return startDate >= today;
    },
    {
      message: "Start date cannot be before today",
      path: ["startDate"],
    },
  )
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
export const UPDATE_BOGO = z
  .object({
    productId: z.string().uuid("Invalid product id").optional(),
    startDate: z.coerce.date("Start date is required"),
    endDate: z.coerce.date("End date is required"),
  })
  .refine(
    (data) =>
      data.startDate && data.endDate ? data.endDate > data.startDate : true,
    { message: "End date must be after start date", path: ["endDate"] },
  );

export const GET_BOGO = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  storeId: z.string().uuid("Invalid store id").optional(),
  productId: z.string().uuid("Invalid product id").optional(),
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
