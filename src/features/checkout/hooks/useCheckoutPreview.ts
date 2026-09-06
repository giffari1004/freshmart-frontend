"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import { checkoutService } from "../checkout.service";
import {
  CheckoutPreviewRequest,
} from "../checkout.type";

export function useCheckoutPreview() {
  return useMutation({
    mutationFn: (
      payload: CheckoutPreviewRequest,
    ) =>
      checkoutService.getPreview(
        payload,
      ),
  });
}