import z from "zod";
import { MIN_PURCHASE_VALUE_TYPE } from "./constant";

export const CREATE_MIN_PURCHASE_DISCOUNT = z
  .object({
    storeId: z.string().uuid("Invalid store id"),
    valueType: z.enum(MIN_PURCHASE_VALUE_TYPE),
    value: z
      .number("Input number min 1 characther")
      .positive("Min Rp 1.000 or 1%"),
    maxDiscountAmount: z
      .number("Min Rp 1.000")
      .positive("Min Rp 1.000")
      .min(1000, "Min Rp 1.000")
      .optional(),
    minPurchaseAmount: z
      .number("Min Rp 1.000")
      .positive("Min Rp 1.000")
      .min(1000, "Min Rp 1.000")
      .optional(),
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
  .refine(
    (data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true),
    {
      message: "Percentage discount cannot exceed 100",
      path: ["value"],
    },
  )
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
export const UPDATE_MIN_PURCHASE_DISCOUNT = z
  .object({
    valueType: z.enum(MIN_PURCHASE_VALUE_TYPE),
    value: z.coerce.number().positive("Min Rp 1.000 or 1%"),
    maxDiscountAmount: z.coerce.number().min(1000, "Min Rp 1.000").optional(),
    minPurchaseAmount: z.coerce.number().min(1000, "Min Rp 1.000"),
    startDate: z.coerce.date("Start date is required"),
    endDate: z.coerce.date("End date is required"),
  })
  .refine((data) => data.valueType !== "PERCENTAGE" || data.value <= 100, {
    message: "Percentage discount cannot exceed 100",
    path: ["value"],
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
export const GET_MIN_PURCHASE_DISCOUNTS = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  storeId: z.string().uuid("Invalid store id").optional(),
});

export interface MinPurchaseDiscount {
  id: string;
  storeId: string;
  valueType: "PERCENTAGE" | "NOMINAL";
  value: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  store: { id: string; name: string };
}

export type getMinPurchaseOutput = z.output<typeof GET_MIN_PURCHASE_DISCOUNTS>;
export type createMinPurchaseInput = z.input<
  typeof CREATE_MIN_PURCHASE_DISCOUNT
>;
export type createMinPurchaseOutput = z.output<
  typeof CREATE_MIN_PURCHASE_DISCOUNT
>;
export type updateMinPurchaseOutput = z.output<
  typeof UPDATE_MIN_PURCHASE_DISCOUNT
>;
export type updateMinPurchaseInput = z.input<
  typeof UPDATE_MIN_PURCHASE_DISCOUNT
>;
