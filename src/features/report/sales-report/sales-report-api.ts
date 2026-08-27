import { api } from "@/lib/axios";
import {
  getCategoryReportSchema,
  getMonthlyReportSchema,
  getProductReportSchema,
} from "./schema";

export async function fetchMonthlyReport(query: getMonthlyReportSchema) {
  const { data } = await api.get("/reports/sales/monthly", { params: query });
  return data;
}
export async function fetchProductReport(query: getProductReportSchema) {
  const { data } = await api.get("/reports/sales/product", { params: query });
  return data;
}
export async function fetchCategoryReport(query: getCategoryReportSchema) {
  const { data } = await api.get("/reports/sales/category", { params: query });
  return data;
}
