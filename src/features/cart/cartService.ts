import { api } from "@/lib/axios";

import {
  AddToCartPayload,
  CartResponse,
  UpdateCartPayload,
} from "./cartType";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

function unwrapCartResponse(
  response: ApiResponse<CartResponse> | CartResponse,
): CartResponse {
  if (
    "data" in response &&
    response.data &&
    typeof response.data === "object" &&
    "items" in response.data
  ) {
    return response.data;
  }

  if (
    "items" in response &&
    Array.isArray(response.items)
  ) {
    return response;
  }

  throw new Error(
    "Invalid cart response from server",
  );
}

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const { data } =
      await api.get<
        ApiResponse<CartResponse> | CartResponse
      >("/cart");

    return unwrapCartResponse(data);
  },

  async addToCart(
    payload: AddToCartPayload,
  ): Promise<CartResponse> {
    const { data } =
      await api.post<
        ApiResponse<CartResponse> | CartResponse
      >("/cart", payload);

    return unwrapCartResponse(data);
  },

  async updateCartItem(
    itemId: string,
    payload: UpdateCartPayload,
  ): Promise<CartResponse> {
    const { data } =
      await api.patch<
        ApiResponse<CartResponse> | CartResponse
      >(`/cart/items/${itemId}`, payload);

    return unwrapCartResponse(data);
  },

  async removeCartItem(
    itemId: string,
  ): Promise<CartResponse> {
    const { data } =
      await api.delete<
        ApiResponse<CartResponse> | CartResponse
      >(`/cart/items/${itemId}`);

    return unwrapCartResponse(data);
  },

  async clearCart() {
    const { data } =
      await api.delete<
        ApiResponse<CartResponse> | CartResponse
      >("/cart");

    return data;
  },
};