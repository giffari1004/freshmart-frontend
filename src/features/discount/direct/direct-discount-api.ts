import { api } from "@/lib/axios";
import { createDiscountOutput, getDiscountsOutput, updateDiscountOutput } from "./schema";

export async function fetchDiscounts(query: getDiscountsOutput) {
  const { data } = await api.get("/admin/discounts", { params: query });
  return data;
}
export async function createDiscount(body: createDiscountOutput) {
  const { data } = await api.post("/admin/discounts", body);
  return data;
}
export async function updateDiscount(body: updateDiscountOutput, id: string) {
  const { data } = await api.patch(`/admin/discounts/${id}`, body);
  return data;
}
export async function deleteDiscount(id: string) {
  const { data } = await api.delete(`/admin/discounts/${id}`);
  return data;
}