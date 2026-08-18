import { api } from "@/lib/axios";
import { AddToCartPayload, CartResponse, UpdateCartPayload } from "./cartType";
interface ApiResponse<T> { success: boolean; message?: string; data: T; }
type CartApiResponse = ApiResponse<CartResponse> | CartResponse;
export const cartService = {
  async getCart(): Promise<CartResponse> { return unwrap((await api.get<CartApiResponse>("/cart")).data); },
  async addToCart(payload: AddToCartPayload): Promise<CartResponse> { return unwrap((await api.post<CartApiResponse>("/cart", payload)).data); },
  async updateCartItem(itemId: string, payload: UpdateCartPayload): Promise<CartResponse> { return unwrap((await api.patch<CartApiResponse>(`/cart/items/${itemId}`, payload)).data); },
  async removeCartItem(itemId: string): Promise<CartResponse> { return unwrap((await api.delete<CartApiResponse>(`/cart/items/${itemId}`)).data); },
  async clearCart() { return (await api.delete<CartApiResponse>("/cart")).data; },
};
function unwrap(response: CartApiResponse): CartResponse { if (isWrapped(response)) return response.data; if (isCart(response)) return response; throw new Error("Invalid cart response from server"); }
function isWrapped(response: CartApiResponse): response is ApiResponse<CartResponse> { return "data" in response && isCart(response.data); }
function isCart(response: unknown): response is CartResponse { return !!response && typeof response === "object" && "items" in response && Array.isArray(response.items); }
