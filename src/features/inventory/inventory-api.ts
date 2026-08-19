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
  const { data } = await api.get("/inventories", { params: query });
  return data;
}
export async function createInventory(body: createInventorySchema) {
  const { data } = await api.post("/inventories", body);
  return data;
}
export async function updateInventory(body: updateInventorySchema, id: string) {
  const { data } = await api.patch(`/inventories/${id}`, body);
  return data;
}
export async function deleteInventory(id: string) {
  const { data } = await api.delete(`/inventories/${id}`);
  return data;
}
export async function stockIn(id: string, body: stockInSchema) {
  const { data } = await api.post(`/inventories/${id}/in`, body);
  return data;
}
export async function stockOut(id: string, body: stockOutSchema) {
  const { data } = await api.post(`/inventories/${id}/out`, body);
  return data;
}
    export async function getStockHistory(id: string, query: getStockHistorySchema) {
    const { data } = await api.get(`/inventories/${id}/history`, {params:query});
    return data;
}
