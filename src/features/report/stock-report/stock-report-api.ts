import { api } from "@/lib/axios";
import { getMonthlySummarySchema, getStockDetailSchema } from "./schema";

export async function fetchMonthlySummary(query: getMonthlySummarySchema) {
  const { data } = await api.get("/reports/stock/summary", { params: query });
  return data.data;
}
export async function fetchStockDetail(query: getStockDetailSchema) {
  const { data } = await api.get("/reports/stock/detail", { params: query });
  return data.data;
}
