"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateBogo } from "./create-bogo";
import { DeleteBogo } from "./delete-bogo";
import { UpdateBogo } from "./edit-bogo";
import { BogoFilter } from "./bogo-filter";
import { BogoTable } from "./bogo-table";
import { useGetAllBogo } from "@/features/discount/bogo/hooks";
import { getBogoOutput, Bogo } from "@/features/discount/bogo/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function BogoTab() {
  const role = useAuthStore((s) => s.user?.role);
  const canManageBogo = role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [activeOnly, setActiveOnly] = useState(true);
  const [editBogo, setEditBogo] = useState<Bogo | null>(null);
  const [deleteBogo, setDeleteBogo] = useState<Bogo | null>(null);
  const query: getBogoOutput = { storeId, activeOnly };
  const { data, isLoading } = useGetAllBogo(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Buy 1 Get 1</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage buy 1 get 1 promos
          </p>
        </div>
        {canManageBogo && <CreateBogo />}
      </div>

      <BogoFilter
        storeId={storeId}
        onStoreIdChange={setStoreId}
        activeOnly={activeOnly}
        onActiveOnlyChange={setActiveOnly}
      />
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <BogoTable
          bogos={data?.data ?? []}
          onEdit={setEditBogo}
          onDelete={setDeleteBogo}
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