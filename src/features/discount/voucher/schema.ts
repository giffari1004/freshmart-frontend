import z from "zod";
import {
  VOUCHER_SORT_BY,
  VOUCHER_SORT_ORDER,
  VOUCHER_USAGE_TYPE,
  VOUCHER_VALUE_TYPE,
} from "./constant";

export const CREATE_VOUCHER = z
  .object({
    discountId: z.string().uuid("Invalid discount id").optional(),
    code: z.string().min(1, "Voucher code is required"),
    usageType: z.enum(VOUCHER_USAGE_TYPE),
    valueType: z.enum(VOUCHER_VALUE_TYPE),
    value: z.number().positive(),
    maxDiscountAmount: z.number().positive().optional(),
    minPurchaseAmount: z.number().positive().optional(),
    productId: z.string().uuid("Invalid product id").optional(),
    expiredAt: z.coerce.date(),
    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => (data.valueType === "PERCENTAGE" ? data.value <= 100 : true),
    {
      message: "Percentage voucher cannot exceed 100",
      path: ["value"],
    },
  )
  .refine(
    (data) =>
      data.usageType === "CART_TOTAL" || data.valueType === "PERCENTAGE"
        ? data.maxDiscountAmount !== undefined
        : true,
    {
      message:
        "Max discount amount is required for CART_TOTAL usage or PERCENTAGE value type",
      path: ["maxDiscountAmount"],
    },
  )
  .refine(
    (data) =>
      data.usageType === "PRODUCT_SPECIFIC"
        ? data.productId !== undefined
        : true,
    {
      message: "productId is required when usageType is PRODUCT_SPECIFIC",
      path: ["productId"],
    },
  );

export const UPDATE_VOUCHER = z.object({
  discountId: z.string().uuid("Invalid discount id").optional(),
  code: z.string().min(1).optional(),
  usageType: z.enum(VOUCHER_USAGE_TYPE).optional(),
  valueType: z.enum(VOUCHER_VALUE_TYPE).optional(),
  value: z.number().positive().optional(),
  maxDiscountAmount: z.number().positive().optional(),
  minPurchaseAmount: z.number().positive().optional(),
  productId: z.string().uuid("Invalid product id").optional(),
  expiredAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
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
  isActive: z.coerce.boolean().optional(),
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
  discountId: string | null;
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
