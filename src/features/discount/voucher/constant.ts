export const VOUCHER_USAGE_TYPE = ["PRODUCT_SPECIFIC", "CART_TOTAL", "SHIPPING"] as const;
export const VOUCHER_VALUE_TYPE = ["PERCENTAGE", "NOMINAL"] as const;
export const VOUCHER_SORT_BY = ["createdAt", "expiredAt", "value"] as const;
export const VOUCHER_SORT_ORDER = ["asc", "desc"] as const;
export type VoucherUsageType = (typeof VOUCHER_USAGE_TYPE)[number];
export type VoucherValueType = (typeof VOUCHER_VALUE_TYPE)[number];