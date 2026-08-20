"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateMinPurchaseDiscount } from "./create-min-purchase";
import { DeleteMinPurchaseDiscount } from "./delete-min-purchase";
import { UpdateMinPurchaseDiscount } from "./edit-minimum-purchase";
import { MinPurchaseFilter } from "./min-purchase-filters";
import { MinPurchaseTable } from "./min-purchase-table";
import { useGetAllMinPurchaseDiscounts } from "@/features/discount/minimum-purchase/hooks";
import { getMinPurchaseOutput, MinPurchaseDiscount } from "@/features/discount/minimum-purchase/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function MinPurchaseTab() {
  const role = useAuthStore((s) => s.user?.role);
  const canManageDiscount = role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [activeOnly, setActiveOnly] = useState(true);
  const [editDiscount, setEditDiscount] = useState<MinPurchaseDiscount | null>(null);
  const [deleteDiscount, setDeleteDiscount] = useState<MinPurchaseDiscount | null>(null);
  const query: getMinPurchaseOutput = { storeId, activeOnly };
  const { data, isLoading } = useGetAllMinPurchaseDiscounts(query);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Min. Purchase Discounts</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage discounts based on minimum purchase amount
          </p>
        </div>
        {canManageDiscount && <CreateMinPurchaseDiscount />}
      </div>
      <MinPurchaseFilter
        storeId={storeId}
        onStoreIdChange={setStoreId}
        activeOnly={activeOnly}
        onActiveOnlyChange={setActiveOnly}
      />
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <MinPurchaseTable
          discounts={data?.data ?? []}
          onEdit={setEditDiscount}
          onDelete={setDeleteDiscount}
        />
      )}
      {canManageDiscount && (
        <>
          <UpdateMinPurchaseDiscount discount={editDiscount} onClose={() => setEditDiscount(null)} />
          <DeleteMinPurchaseDiscount discount={deleteDiscount} onClose={() => setDeleteDiscount(null)} />
        </>
      )}
    </div>
  );
}