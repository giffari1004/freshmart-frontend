import { api } from "@/lib/axios";

import {
  CheckoutPreviewRequest,
  CheckoutPreviewResponse,
} from "./checkout.type";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const checkoutService = {
  async getPreview(
    payload: CheckoutPreviewRequest,
  ): Promise<CheckoutPreviewResponse> {
    const { data } =
      await api.post<
        ApiResponse<CheckoutPreviewResponse>
      >(
        "/checkout/preview",
        payload,
      );

    return data.data;
  },
};