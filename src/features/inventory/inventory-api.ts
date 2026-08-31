import { api } from "@/lib/axios";
import {
  createInventorySchema,
  getAllInventorySchema,
  getStockHistorySchema,
  stockInSchema,
  stockOutSchema,
  updateInventorySchema,
} from "./schema";

export async function fetchInventory(query: getAllInventorySchema) {
  const { data } = await api.get("/inventory", { params: query });
  return data;
}
export async function createInventory(body: createInventorySchema) {
  const { data } = await api.post("/inventory", body);
  return data;
}
export async function updateInventory(body: updateInventorySchema, id: string) {
  const { data } = await api.patch(`/inventory/${id}`, body);
  return data;
}
export async function deleteInventory(id: string) {
  const { data } = await api.delete(`/inventory/${id}`);
  return data;
}
export async function stockIn(id: string, body: stockInSchema) {
  const { data } = await api.post(`/inventory/${id}/in`, body);
  return data;
}
export async function stockOut(id: string, body: stockOutSchema) {
  const { data } = await api.post(`/inventory/${id}/out`, body);
  return data;
}
    export async function getStockHistory(id: string, query: getStockHistorySchema) {
    const { data } = await api.get(`/inventory/${id}/history`, {params:query});
    return data;
}
