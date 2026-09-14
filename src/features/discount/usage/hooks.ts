import { useQuery } from "@tanstack/react-query";
import { discountUsageSchemaType } from "./schema";
import { fetchDiscountUsage } from "./discount-usage-api";

export function useDiscountUsage(query: discountUsageSchemaType) {
  return useQuery({
    queryKey: ["discount-usage", query],
    queryFn: () => fetchDiscountUsage(query),
  });
}
