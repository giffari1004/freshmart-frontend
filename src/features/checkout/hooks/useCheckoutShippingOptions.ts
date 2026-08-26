"use client";

import { useQuery } from "@tanstack/react-query";
import { checkoutService } from "../checkout.service";

export function useCheckoutShippingOptions(
  addressId?: string,
) {
  return useQuery({
    queryKey: ["checkout-shipping-options", addressId],
    queryFn: () =>
      checkoutService.getShippingOptions(addressId as string),
    enabled: Boolean(addressId),
    staleTime: 60_000,
  });
}