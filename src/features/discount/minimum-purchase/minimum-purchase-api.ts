import { api } from "@/lib/axios";
import { createMinPurchaseOutput, getMinPurchaseOutput, updateMinPurchaseOutput } from "./schema";

export async function fetchMinPurchaseDiscounts(query: getMinPurchaseOutput) {
  const { data } = await api.get("/admin/discounts/minimum-purchase", { params: query });
  return data;
}
export async function createMinPurchaseDiscount(body: createMinPurchaseOutput) {
  const { data } = await api.post("/admin/discounts/minimum-purchase", body);
  return data;
}
export async function updateMinPurchaseDiscount(body: updateMinPurchaseOutput, id: string) {
  const { data } = await api.patch(`/admin/discounts/minimum-purchase/${id}`, body);
  return data;
}
export async function deleteMinPurchaseDiscount(id: string) {
  const { data } = await api.delete(`/admin/discounts/minimum-purchase/${id}`);
  return data;
}