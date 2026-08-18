import { api } from "@/lib/axios";

export async function addToCart(params: {
  storeProductId: string;
  quantity: number;
}) {
  const { data } = await api.post("/cart/items", params);
  return data;
}
