import { api } from "@/lib/axios";
import { createMinPurchaseOutput, getMinPurchaseOutput, updateMinPurchaseOutput } from "./schema";

export async function fetchMinPurchaseDiscounts(query: getMinPurchaseOutput) {
  const { data } = await api.get("/discounts/minimum-purchase", { params: query });
  return data;
}
export async function createMinPurchaseDiscount(body: createMinPurchaseOutput) {
  const { data } = await api.post("/discounts/minimum-purchase", body);
  return data;
}
export async function updateMinPurchaseDiscount(body: updateMinPurchaseOutput, id: string) {
  const { data } = await api.patch(`/discounts/minimum-purchase/${id}`, body);
  return data;
}
export async function deleteMinPurchaseDiscount(id: string) {
  const { data } = await api.delete(`/discounts/minimum-purchase/${id}`);
  return data;
}