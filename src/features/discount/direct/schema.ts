import z from "zod";
import { DISCOUNT_VALUE_TYPE } from "./constant";

export const CREATE_DISCOUNT = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    productId: z.string().uuid("Invalid product id"),
    valueType: z.enum(DISCOUNT_VALUE_TYPE),
    value: z
      .number("Input number min 1 characther")
      .positive("Min Rp 1.000 or 1%"),
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
  })
  .refine(
    (data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true),
    {
      message: "Percentage discount cannot exceed 100",
      path: ["value"],
    },
  );
export const UPDATE_DISCOUNT = z
  .object({
    valueType: z.enum(DISCOUNT_VALUE_TYPE).optional(),
    value: z.coerce
      .number("Input number min 1 characther")
      .positive("Min Rp 1.000 or 1%")
      .optional(),
    startDate: z.coerce.date("Start date is required"),
    endDate: z.coerce.date("End date is required"),
  })
  .refine(
    (data) => {
      if (data.valueType === "PERCENTAGE" && data.value !== undefined) {
        return data.value <= 100;
      }
      return true;
    },
    {
      message: "Percentage discount cannot exceed 100",
      path: ["value"],
    },
  );
export const GET_DISCOUNTS = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  storeId: z.string().uuid("Invalid store id").optional(),
  productId: z.string().uuid("Invalid product id").optional(),
});
export interface Discount {
  id: string;
  storeId: string;
  productId: string;
  valueType: "PERCENTAGE" | "NOMINAL";
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  product: { id: string; name: string };
  store: { id: string; name: string };
}

export type getDiscountsInput = z.input<typeof GET_DISCOUNTS>;
export type getDiscountsOutput = z.output<typeof GET_DISCOUNTS>;
export type createDiscountInput = z.input<typeof CREATE_DISCOUNT>;
export type createDiscountOutput = z.output<typeof CREATE_DISCOUNT>;
export type updateDiscountOutput = z.output<typeof UPDATE_DISCOUNT>;
export type updateDiscountInput = z.input<typeof UPDATE_DISCOUNT>;
