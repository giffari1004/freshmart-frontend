"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateDiscount } from "./create-discount";
import { DeleteDiscount } from "./delete-discount";
import { UpdateDiscount } from "./edit-discount";
import { DiscountFilter } from "./discount-filter";
import { DiscountTable } from "./discount-table";
import { useGetAllDiscounts } from "@/features/discount/direct/hooks";
import { getDiscountsOutput, Discount } from "@/features/discount/direct/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function DirectDiscountTab() {
  const role = useAuthStore((s) => s.user?.role);
  const canManageDiscount = role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [activeOnly, setActiveOnly] = useState(true);
  const [editDiscount, setEditDiscount] = useState<Discount | null>(null);
  const [deleteDiscount, setDeleteDiscount] = useState<Discount | null>(null);
  const query: getDiscountsOutput = { storeId, activeOnly };
  const { data, isLoading } = useGetAllDiscounts(query);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Direct Discounts</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage direct discounts applied to products
          </p>
        </div>
        {canManageDiscount && <CreateDiscount />}
      </div>
      <DiscountFilter
        storeId={storeId}
        onStoreIdChange={setStoreId}
        activeOnly={activeOnly}
        onActiveOnlyChange={setActiveOnly}
      />
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <DiscountTable
          discounts={data?.data ?? []}
          onEdit={setEditDiscount}
          onDelete={setDeleteDiscount}
        />
      )}
      {canManageDiscount && (
        <>
          <UpdateDiscount discount={editDiscount} onClose={() => setEditDiscount(null)} />
          <DeleteDiscount discount={deleteDiscount} onClose={() => setDeleteDiscount(null)} />
        </>
      )}
    </div>
  );
}