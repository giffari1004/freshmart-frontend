import z from "zod";
import { MIN_PURCHASE_VALUE_TYPE } from "./constant";

export const CREATE_MIN_PURCHASE_DISCOUNT = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    productId: z.string().uuid("Invalid product id").optional(),
    valueType: z.enum(MIN_PURCHASE_VALUE_TYPE),
    value: z.number().positive(),
    minPurchaseAmount: z.number().positive(),
    maxDiscountAmount: z.number().positive().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true), {
    message: "Percentage discount cannot exceed 100",
    path: ["value"],
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const UPDATE_MIN_PURCHASE_DISCOUNT = z
  .object({
    valueType: z.enum(MIN_PURCHASE_VALUE_TYPE).optional(),
    value: z.number().positive().optional(),
    minPurchaseAmount: z.number().positive().optional(),
    maxDiscountAmount: z.number().positive().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => (data.valueType === "PERCENTAGE" && data.value !== undefined ? data.value <= 100 : true),
    { message: "Percentage discount cannot exceed 100", path: ["value"] },
  )
  .refine(
    (data) => (data.startDate && data.endDate ? data.endDate > data.startDate : true),
    { message: "End date must be after start date", path: ["endDate"] },
  );

export const GET_MIN_PURCHASE_DISCOUNTS = z.object({
  storeId: z.string().uuid("Invalid store id").optional(),
  productId: z.string().uuid("Invalid product id").optional(),
  activeOnly: z.coerce.boolean().default(true),
});

export interface MinPurchaseDiscount {
  id: string;
  storeId: string;
  productId: string | null;
  valueType: "PERCENTAGE" | "NOMINAL";
  value: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  product: { id: string; name: string } | null;
  store: { id: string; name: string };
}

export type getMinPurchaseOutput = z.output<typeof GET_MIN_PURCHASE_DISCOUNTS>;
export type createMinPurchaseInput = z.input<typeof CREATE_MIN_PURCHASE_DISCOUNT>;
export type createMinPurchaseOutput = z.output<typeof CREATE_MIN_PURCHASE_DISCOUNT>;
export type updateMinPurchaseOutput = z.output<typeof UPDATE_MIN_PURCHASE_DISCOUNT>;
export type updateMinPurchaseInput = z.input<typeof UPDATE_MIN_PURCHASE_DISCOUNT>;