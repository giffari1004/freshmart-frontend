"use client";

import { useQuery } from "@tanstack/react-query";
import { checkoutService } from "../checkout.service";
import { CheckoutPreviewRequest } from "../checkout.type";

export function useCheckoutPreview(
  addressId: string,
  shippingMethodId: string,
  userVoucherId: string,
) {
  const enabled = Boolean(addressId && shippingMethodId);

  return useQuery({
    queryKey: [
      "checkout-preview",
      addressId,
      shippingMethodId,
      userVoucherId,
    ],
    queryFn: () =>
      checkoutService.getPreview({
        addressId,
        shippingMethodId,
        ...(userVoucherId.trim()
          ? { userVoucherId }
          : {}),
      }),
    enabled,
  });
}