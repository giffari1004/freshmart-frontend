import { api } from "@/lib/axios";
import {
  AddToCartPayload,
  BogoCalculation,
  CartResponse,
  UpdateCartPayload,
} from "./cartType";
import { normalizeCartResponse } from "./mappers/cart.mapper";
import { CartApiResponse } from "./types/cart.backend.type";

interface BogoPayload {
  storeId: string;
  productId: string;
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await api.get<CartApiResponse>("/cart");
    return normalizeCartResponse(response.data);
  },

  async addToCart(payload: AddToCartPayload): Promise<CartResponse> {
    const response = await api.post<CartApiResponse>("/cart/items", payload);
    return normalizeCartResponse(response.data);
  },

  async updateCartItem(
    itemId: string,
    payload: UpdateCartPayload,
  ): Promise<CartResponse> {
    const response = await api.patch<CartApiResponse>(
      `/cart/items/${itemId}`,
      payload,
    );
    return normalizeCartResponse(response.data);
  },

  async removeCartItem(itemId: string): Promise<CartResponse> {
    const response = await api.delete<CartApiResponse>(
      `/cart/items/${itemId}`,
    );
    return normalizeCartResponse(response.data);
  },

  async clearCart(): Promise<unknown> {
    const response = await api.delete<CartApiResponse>("/cart");
    return response.data;
  },

  async calculateBogo(payload: BogoPayload): Promise<BogoCalculation> {
    const response = await api.post<{ data: BogoCalculation }>(
      "/bogo/calculate",
      payload,
    );
    return response.data.data;
  },
};