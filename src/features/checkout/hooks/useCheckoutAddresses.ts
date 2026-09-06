"use client";

import { useQuery } from "@tanstack/react-query";
import { checkoutService } from "../checkout.service";

export function useCheckoutAddresses() {
  return useQuery({
    queryKey: ["checkout-addresses"],
    queryFn: checkoutService.getAddresses,
    staleTime: 30_000,
  });
}
