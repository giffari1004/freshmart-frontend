import { api } from "@/lib/axios";
import {
  AddToCartPayload,
  CartResponse,
  UpdateCartPayload,
} from "./cartType";

export const cartService = {
  async getCart() {
    const { data } = await api.get<CartResponse>("/cart");
    return data;
  },

  async addToCart(payload: AddToCartPayload) {
    const { data } = await api.post<CartResponse>(
      "/cart",
      payload,
    );

    return data;
  },

  async updateCartItem(
    itemId: string,
    payload: UpdateCartPayload,
  ) {
    const { data } = await api.patch<CartResponse>(
      `/cart/items/${itemId}`,
      payload,
    );

    return data;
  },

  async removeCartItem(itemId: string) {
    const { data } = await api.delete<CartResponse>(
      `/cart/items/${itemId}`,
    );

    return data;
  },

  async clearCart() {
    const { data } = await api.delete("/cart");

    return data;
  },
};