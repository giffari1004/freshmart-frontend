import { useQuery } from "@tanstack/react-query";
import {
  getCategoryReportSchema,
  getMonthlyReportSchema,
  getProductReportSchema,
} from "./schema";
import {
  fetchCategoryReport,
  fetchMonthlyReport,
  fetchProductReport,
} from "./sales-report-api";

export function useFetchMonthlyReport(query: getMonthlyReportSchema) {
  return useQuery({
    queryKey: ["monthly-report", query],
    queryFn: () => fetchMonthlyReport(query),
  });
}
export function useFetchProductReport(query: getProductReportSchema) {
  return useQuery({
    queryKey: ["product-report", query],
    queryFn: () => fetchProductReport(query),
  });
}
export function useFetchCategoryReport(query: getCategoryReportSchema) {
  return useQuery({
    queryKey: ["category-report", query],
    queryFn: () => fetchCategoryReport(query),
  });
}
