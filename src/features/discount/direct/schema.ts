import z from "zod";
import { DISCOUNT_VALUE_TYPE } from "./constant";

export const CREATE_DISCOUNT = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    productId: z.string().uuid("Invalid product id"),
    valueType: z.enum(DISCOUNT_VALUE_TYPE),
    value: z.number().positive(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine((data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true), {
    message: "Percentage discount cannot exceed 100",
    path: ["value"],
  });

export const UPDATE_DISCOUNT = z.object({
  valueType: z.enum(DISCOUNT_VALUE_TYPE).optional(),
  value: z.number().positive().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const GET_DISCOUNTS = z.object({
  storeId: z.string().uuid("Invalid store id").optional(),
  productId: z.string().uuid("Invalid product id").optional(),
  activeOnly: z.coerce.boolean().default(true),
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