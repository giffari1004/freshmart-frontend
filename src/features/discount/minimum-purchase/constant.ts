import { MinPurchaseDiscount } from "./schema";

export const MIN_PURCHASE_VALUE_TYPE = ["PERCENTAGE", "NOMINAL"] as const;
export const minPurchaseValue = (discount:MinPurchaseDiscount) => ({
  valueType: discount.valueType,
  value: discount.value,
  minPurchaseAmount: discount.minPurchaseAmount,
  maxDiscountAmount: discount.maxDiscountAmount ?? undefined,
  startDate: new Date(discount.startDate),
  endDate: new Date(discount.endDate),
});
