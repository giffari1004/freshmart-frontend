import { useQuery } from "@tanstack/react-query";
import { checkoutService } from "../checkout.service";

export function useCheckoutVouchers(storeId?: string) {
  return useQuery({
    queryKey: ["checkout-vouchers", storeId],
    queryFn: () => checkoutService.getVouchers(storeId),
    enabled: Boolean(storeId),
  });
}