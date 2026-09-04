"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { SalesReportFilter } from "./sales-report-filter";
import { SalesMonthlyReport } from "./sales-monthly-report";
import { SalesProductReport } from "./sales-product-report";
import { SalesCategoryReport } from "./sales-category-report";

export function SalesTabReport() {
  const role = useAuthStore((s) => s.user?.role);
  const canFilterStore = role === "SUPER_ADMIN";
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Report management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">Sales Report</h1>
        <p className="mt-1 text-sm text-stone-500">
          Monthly sales performance accross products and categories
        </p>
      </div>
      <SalesReportFilter
      storeId={storeId}
      onStoreIdChange={setStoreId}
      month={month}
      onMonthChange={setMonth}
      year={year}
      onYearChange={setYear}
      canFilterStore={canFilterStore}
      />
      <SalesMonthlyReport storeId={storeId} year={year}/>
      <SalesCategoryReport storeId={storeId} year={year} month={month}/>
      <SalesProductReport storeId={storeId} year={year} month={month}/>
      </div>
  )
}
