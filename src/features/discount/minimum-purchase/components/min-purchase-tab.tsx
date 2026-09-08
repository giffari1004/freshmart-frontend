"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateMinPurchaseDiscount } from "./create-min-purchase";
import { DeleteMinPurchaseDiscount } from "./delete-min-purchase";
import { UpdateMinPurchaseDiscount } from "./edit-minimum-purchase";
import { MinPurchaseTable } from "./min-purchase-table";
import { useGetAllMinPurchaseDiscounts } from "@/features/discount/minimum-purchase/hooks";
import {
  getMinPurchaseOutput,
  MinPurchaseDiscount,
} from "@/features/discount/minimum-purchase/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { DiscountFilter } from "@/lib/discount-filter-helper";
export function MinPurchaseTab() {
  const role = useAuthStore((s) => s.user?.role);

  const isSuperAdmin = role === "SUPER_ADMIN";
  const canManageDiscount =
    role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [editDiscount, setEditDiscount] =
    useState<MinPurchaseDiscount | null>(null);
  const [deleteDiscount, setDeleteDiscount] =
    useState<MinPurchaseDiscount | null>(null);
  const query: getMinPurchaseOutput = {
    page,
    limit: 10,
    storeId,
  };
  const { data, isLoading } = useGetAllMinPurchaseDiscounts(query);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Min. Purchase Discounts
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage discounts based on minimum purchase amount
          </p>
        </div>

        {canManageDiscount && (
          <CreateMinPurchaseDiscount isSuperAdmin={isSuperAdmin} />
        )}
      </div>
      {isSuperAdmin && (
        <DiscountFilter
          storeId={storeId}
          onStoreIdChange={(v) => {
            setStoreId(v);
            setPage(1);
          }}
        />
      )}
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <MinPurchaseTable
          discounts={data?.data ?? []}
          onEdit={setEditDiscount}
          onDelete={setDeleteDiscount}
          meta={data?.meta}
          onPageChange={setPage}
        />
      )}
      {canManageDiscount && (
        <>
          <UpdateMinPurchaseDiscount
            discount={editDiscount}
            onClose={() => setEditDiscount(null)}
          />
          <DeleteMinPurchaseDiscount
            discount={deleteDiscount}
            onClose={() => setDeleteDiscount(null)}
          />
        </>
      )}
    </div>
  );
}