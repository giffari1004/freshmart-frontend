"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateDiscount } from "./create-discount";
import { DeleteDiscount } from "./delete-discount";
import { UpdateDiscount } from "./edit-discount";
import { DiscountTable } from "./discount-table";
import { useGetAllDiscounts } from "@/features/discount/direct/hooks";
import {
  getDiscountsOutput,
  Discount,
} from "@/features/discount/direct/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { DiscountFilter } from "@/lib/discount-filter-helper";
export function DirectDiscountTab() {
  const role = useAuthStore((s) => s.user?.role);
  const isSuperAdmin = role === "SUPER_ADMIN";
  const canManageDiscount =
    role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [editDiscount, setEditDiscount] = useState<Discount | null>(null);
  const [deleteDiscount, setDeleteDiscount] = useState<Discount | null>(null);
  const query: getDiscountsOutput = {
    page,
    limit: 10,
    storeId,
  }
  const { data, isLoading } = useGetAllDiscounts(query);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Direct Discounts
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage direct discounts applied to products
          </p>
        </div>
        {canManageDiscount && (
          <CreateDiscount isSuperAdmin={isSuperAdmin} />
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
        <DiscountTable
          discounts={data?.data ?? []}
          onEdit={setEditDiscount}
          onDelete={setDeleteDiscount}
          meta={data?.meta}
          onPageChange={setPage}
        />
      )}
      {canManageDiscount && (
        <>
          <UpdateDiscount
            discount={editDiscount}
            onClose={() => setEditDiscount(null)}
          />
          <DeleteDiscount
            discount={deleteDiscount}
            onClose={() => setDeleteDiscount(null)}
          />
        </>
      )}
    </div>
  );
}