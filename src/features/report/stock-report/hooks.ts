import { useQuery } from "@tanstack/react-query";
import { getMonthlySummarySchema, getStockDetailSchema } from "./schema";
import { fetchMonthlySummary, fetchStockDetail } from "./stock-report-api";

export function useGetMonthSummary(query: getMonthlySummarySchema) {
  return useQuery({
    queryKey: ["monthly-summary", query],
    queryFn: () => fetchMonthlySummary(query),
  });
}
export function useGetStockDetail(query:getStockDetailSchema){
    return useQuery({
        queryKey: ["stock-detail",query],
        queryFn: ()=> fetchStockDetail(query)
    })
}