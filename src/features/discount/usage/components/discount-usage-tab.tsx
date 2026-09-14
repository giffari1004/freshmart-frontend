import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { discountUsageSchemaType } from "../schema";
import { useDiscountUsage } from "../hooks";
import { DiscountUsageFilter } from "./discount-usage-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { DiscountUsageTable } from "./discount-usage-table";

export function DiscountUsageTab() {
  const role = useAuthStore((s) => s.user?.role);
  const canFilterStore = role === "SUPER_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const query: discountUsageSchemaType = {
    page,
    limit: 10,
    storeId,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  };
  const { data, isLoading } = useDiscountUsage(query);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Discount management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">
          Usage History
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Track discount and voucher usage across orders
        </p>
      </div>
      <DiscountUsageFilter
        storeId={storeId}
        onStoreIdChange={(v) => {
          (setStoreId(v), setPage(1));
        }}
        startDate={startDate}
        onStartDateChange={(v) => {
          (setStoreId(v), setPage(1));
        }}
        endDate={endDate}
        onEndDateChange={(v) => {
          (setEndDate(v), setPage(1));
        }}
        canFilterStore={canFilterStore}
      />
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <DiscountUsageTable 
        usages={data?.data ?? []}
        meta={data?.meta}
        onPageChange={setPage}
        />
      )}
    </div>
  );
}
