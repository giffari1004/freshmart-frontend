"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateBogo } from "./create-bogo";
import { DeleteBogo } from "./delete-bogo";
import { UpdateBogo } from "./edit-bogo";
import { BogoTable } from "./bogo-table";
import { useGetAllBogo } from "@/features/discount/bogo/hooks";
import { getBogoOutput, Bogo } from "@/features/discount/bogo/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { DiscountFilter } from "@/lib/discount-filter-helper";
export function BogoTab() {
  const role = useAuthStore((s) => s.user?.role);
  const isSuperAdmin = role === "SUPER_ADMIN";
  const canManageBogo = role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [page, setPage] = useState(1);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [editBogo, setEditBogo] = useState<Bogo | null>(null);
  const [deleteBogo, setDeleteBogo] = useState<Bogo | null>(null);
  const query: getBogoOutput = {
    page,
    limit: 10,
    storeId: storeId || undefined,
  };
  const { data, isLoading } = useGetAllBogo(query);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Buy 1 Get 1
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage buy 1 get 1 promos
          </p>
        </div>
        {canManageBogo && <CreateBogo isSuperAdmin={isSuperAdmin} />}
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
        <BogoTable
          bogos={data?.data ?? []}
          onEdit={setEditBogo}
          onDelete={setDeleteBogo}
          meta={data?.meta}
          onPageChange={setPage}
        />
      )}
      {canManageBogo && (
        <>
          <UpdateBogo bogo={editBogo} onClose={() => setEditBogo(null)} />
          <DeleteBogo bogo={deleteBogo} onClose={() => setDeleteBogo(null)} />
        </>
      )}
    </div>
  );
}
