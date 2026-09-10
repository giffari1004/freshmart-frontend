import { z } from "zod";
import {
  VOUCHER_SORT_BY,
  VOUCHER_SORT_ORDER,
  VOUCHER_USAGE_TYPE,
  VOUCHER_VALUE_TYPE,
} from "./constant";

export const CREATE_VOUCHER = z
  .object({
    storeId: z.string().uuid("Invalid store id").optional(),
    code: z.string().min(1, "Voucher code is required"),
    usageType: z.enum(VOUCHER_USAGE_TYPE),
    valueType: z.enum(VOUCHER_VALUE_TYPE),
    value: z
      .number("Input number min 1 character")
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
    productId: z.string().uuid("Invalid product id").optional(),
    expiredAt: z.coerce.date({
      error: "Expired date is required",
    }),
    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiredAt = new Date(data.expiredAt);
      expiredAt.setHours(0, 0, 0, 0);
      return expiredAt >= today;
    },
    {
      message: "Expired date cannot be before today",
      path: ["expiredAt"],
    },
  )
  .refine(
    (data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true),
    {
      message: "Percentage voucher cannot exceed 100",
      path: ["value"],
    },
  )
  .refine(
    (data) =>
      data.valueType === "PERCENTAGE"
        ? data.maxDiscountAmount !== undefined
        : true,
    {
      message: "Max discount amount is required for percentage voucher",
      path: ["maxDiscountAmount"],
    },
  )
  .refine(
    (data) =>
      data.usageType === "PRODUCT_SPECIFIC"
        ? data.productId !== undefined
        : true,
    {
      message: "Product is required for PRODUCT_SPECIFIC voucher",
      path: ["productId"],
    },
  );
export const UPDATE_VOUCHER = z
  .object({
    code: z.string().min(1, "Voucher code is required"),
    usageType: z.enum(VOUCHER_USAGE_TYPE),
    valueType: z.enum(VOUCHER_VALUE_TYPE),
    value: z.coerce.number().positive("Value must be greater than 0"),
    maxDiscountAmount: z.coerce
      .number()
      .min(1000, "Maximum discount must be at least Rp 1.000")
      .optional(),
    minPurchaseAmount: z.coerce
      .number()
      .min(1000, "Minimum purchase must be at least Rp 1.000")
      .optional(),
    productId: z.string().uuid().optional(),
    expiredAt: z.coerce.date({
      error: "Expired date is required",
    }),
    isActive: z.boolean(),
  })
  .refine((data) => data.valueType !== "PERCENTAGE" || data.value <= 100, {
    path: ["value"],
    message: "Percentage cannot exceed 100%.",
  })
  .refine(
    (data) =>
      data.valueType === "PERCENTAGE"
        ? data.maxDiscountAmount !== undefined
        : true,
    {
      path: ["maxDiscountAmount"],
      message: "Max discount amount is required for percentage voucher.",
    },
  )
  .refine((data) => data.usageType !== "PRODUCT_SPECIFIC" || !!data.productId, {
    path: ["productId"],
    message: "Please select a product.",
  });

export const GET_ALL_VOUCHER = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  usageType: z.enum(VOUCHER_USAGE_TYPE).optional(),
  valueType: z.enum(VOUCHER_VALUE_TYPE).optional(),
  storeId: z.string().uuid("Invalid store id").optional(),
  sortBy: z.enum(VOUCHER_SORT_BY).default("createdAt"),
  sortOrder: z.enum(VOUCHER_SORT_ORDER).default("desc"),
});

export interface VoucherMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}

export interface Voucher {
  id: string;
  storeId: string;
  store: {
    id: string;
    name: string;
  };
  code: string;
  usageType: "PRODUCT_SPECIFIC" | "CART_TOTAL" | "SHIPPING";
  valueType: "PERCENTAGE" | "NOMINAL";
  value: number;
  maxDiscountAmount: number | null;
  minPurchaseAmount: number | null;
  productId: string | null;
  expiredAt: string;
  isActive: boolean;
  createdAt: string;
}

export type getAllVoucherSchema = z.infer<typeof GET_ALL_VOUCHER>;
export type createVoucherInput = z.input<typeof CREATE_VOUCHER>;
export type createVoucherOutput = z.output<typeof CREATE_VOUCHER>;
export type updateVoucherInput = z.input<typeof UPDATE_VOUCHER>;
export type updateVoucherOutput = z.output<typeof UPDATE_VOUCHER>;
