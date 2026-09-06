import { api } from "@/lib/axios";
import {
  CheckoutOptionAddress,
  CheckoutOptionShipping,
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
    const { data } = await api.post<ApiResponse<CheckoutPreviewResponse>>(
      "/checkout/preview",
      payload,
    );

    return data.data;
  },

  async getAddresses(): Promise<CheckoutOptionAddress[]> {
    const { data } = await api.get<ApiResponse<CheckoutOptionAddress[]>>(
      "/addresses",
    );

    return data.data;
  },

  async getShippingOptions(
    addressId: string,
  ): Promise<CheckoutOptionShipping[]> {
    const { data } = await api.get<ApiResponse<CheckoutOptionShipping[]>>(
      "/checkout/shipping-options",
      { params: { addressId } },
    );

    return data.data;
  },
};
