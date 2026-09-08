import { Voucher } from "./schema";

export const VOUCHER_USAGE_TYPE = [
  "PRODUCT_SPECIFIC",
  "CART_TOTAL",
  "SHIPPING",
] as const;
export const VOUCHER_VALUE_TYPE = ["PERCENTAGE", "NOMINAL"] as const;
export const VOUCHER_SORT_BY = ["createdAt", "expiredAt", "value"] as const;
export const VOUCHER_SORT_ORDER = ["asc", "desc"] as const;
export type VoucherUsageType = (typeof VOUCHER_USAGE_TYPE)[number];
export type VoucherValueType = (typeof VOUCHER_VALUE_TYPE)[number];
export const defaultValueVoucher = (voucher: Voucher) => ({
  storeId: voucher.storeId,
  code: voucher.code,
  usageType: voucher.usageType,
  valueType: voucher.valueType,
  value: voucher.value,
  maxDiscountAmount: voucher.maxDiscountAmount ?? 1000,
  minPurchaseAmount: voucher.minPurchaseAmount ?? undefined,
  productId: voucher.productId ?? undefined,
  expiredAt: new Date(voucher.expiredAt),
  isActive: voucher.isActive,
});
