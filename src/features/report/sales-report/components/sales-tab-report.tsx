"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { SalesReportFilter } from "./sales-report-filter";
import { SalesMonthlyReport } from "./sales-monthly-report";
import { SalesProductReport } from "./sales-product-report";
import { SalesCategoryReport } from "./sales-category-report";
export function SalesTabReport() {
  const role = useAuthStore((s) => s.user?.role);
  const isSuperAdmin = role === "SUPER_ADMIN";
  const canFilterStore = isSuperAdmin;
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const reportStoreId = isSuperAdmin ? storeId : undefined;
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Report management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">
          Sales Report
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Monthly sales performance across products and categories
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
      <SalesMonthlyReport storeId={reportStoreId} year={year} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SalesCategoryReport
          storeId={reportStoreId}
          year={year}
          month={month}
        />
        <SalesProductReport storeId={reportStoreId} year={year} month={month} />
      </div>
    </div>
  );
}
