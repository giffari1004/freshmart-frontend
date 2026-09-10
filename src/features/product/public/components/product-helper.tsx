import { formatPrice } from "@/lib/helper-idr";

export function getDiscountBadge(
  discounts: { type: string; valueType: string; value: number }[] | undefined,
) {
  if (!discounts || discounts.length === 0) return null;
  const bogo = discounts.find((d) => d.type === "BUY1GET1");
  if (bogo) return { label: "BUY 1 GET 1", color: "bg-orange-500" };
  const direct = discounts.find((d) => d.type === "DIRECT");
  if (direct) {
    const label =
      direct.valueType === "PERCENTAGE"
        ? `${direct.value}% OFF`
        : `${formatPrice(direct.value)} OFF`;

    return { label, color: "bg-red-500" };
  }
  return null;
}
