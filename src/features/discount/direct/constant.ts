import { Discount } from "./schema";

export const DISCOUNT_VALUE_TYPE = ["PERCENTAGE", "NOMINAL"] as const;
export const defaultValueDirect = (discount: Discount) => ({
  valueType: discount.valueType,
  value: discount.value,
  startDate: new Date(discount.startDate),
  endDate: new Date(discount.endDate),
});
