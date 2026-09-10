"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { StockReportMonthlySummaryFilter } from "./stock-report-filter";
import { StockReportMonthlySummary } from "./stock-report-monthly-summary";
import { StockDetailFilter } from "./stock-detail-filter";
import { StockDetailReport } from "./stock-detail-report";

export function StockTabReport() {
  const role = useAuthStore((v) => v.user?.role);
  const canFilterStore = role === "SUPER_ADMIN";
  const [month, setMonth] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [storeId, setStoreId] = useState<string | undefined>();
  const [productId, setProductId] = useState<string | undefined>();
  const [detailYear, setDetailYear] = useState(2026);
  const [detailMonth, setDetailMonth] = useState(new Date().getMonth() + 1);
  const [detailStoreId, setDetailStoreId] = useState<string | undefined>();
  const [detailProductId, setDetailProductId] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Report Management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">
          Stock Report
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Monthly stock report by product and store.
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

      <StockReportMonthlySummary
        storeId={storeId}
        productId={productId}
        month={month}
        year={year}
      />

      <StockDetailFilter
        storeId={detailStoreId}
        onStoreIdChange={setDetailStoreId}
        productId={detailProductId}
        onProductIdChange={(value) => {
          setDetailProductId(value);
          setPage(1);
        }}
        year={detailYear}
        onYearChange={(value) => {
          setDetailYear(value);
          setPage(1);
        }}
        month={detailMonth}
        onMonthChange={(value) => {
          setDetailMonth(value);
          setPage(1);
        }}
        canFilterStore={canFilterStore}
      />

      <StockDetailReport
        storeId={detailStoreId}
        productId={detailProductId}
        month={detailMonth}
        year={detailYear}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}