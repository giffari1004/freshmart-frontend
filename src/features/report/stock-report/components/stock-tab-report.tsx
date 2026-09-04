"use client"
import { useState } from "react";
import { StockReportMonthlySummaryFilter } from "./stock-report-filter";
import { useAuthStore } from "@/stores/auth-store";
import { StockDetailReport } from "./stock-detail-report";
import { StockReportMonthlySummary } from "./stock-report-monthly-summary";
import { StockDetailFilter } from "./stock-detail-filter";

export function StockTabReport() {
  const role = useAuthStore((v) => v.user?.role);
  const canFilterStore = role === "SUPER_ADMIN";
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [detailYear, setDetailYear] = useState<number>(2026);
  const [detailMonth, setDetailMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [detailStoreId , setDetailStoreId] = useState<string | undefined>(undefined)
  const [detailProductId , setDetailProductId] = useState<string | undefined>(undefined)
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Report management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">
          Stock Report
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Monthly stock report by product and store
        </p>
      </div>
      <StockReportMonthlySummaryFilter
        storeId={storeId}
        onStoreIdChange={setStoreId}
        productId={productId}
        onProductIdChange={setProductId}
        month={month}
        onMonthChange={setMonth}  
        year={year}
        onYearChange={setYear}
        canFilterStore={canFilterStore}
      />
      <StockReportMonthlySummary storeId={storeId} month={month} year={year} />
      <StockDetailFilter
      storeId={detailStoreId}
      onStoreIdChange={setDetailStoreId}
      productId={detailProductId}
      onProductIdChange={setDetailProductId}
      year={detailYear}
      onYearChange={setDetailYear}
      month={detailMonth}
      onMonthChange={setDetailMonth}
      canFilterStore={canFilterStore}
      />
      <StockDetailReport
        storeId={detailStoreId}
        productId={detailProductId}
        month={detailMonth}
        year={detailYear}
      />
    </div>
  );
}
