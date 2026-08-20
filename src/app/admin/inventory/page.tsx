"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateInventory } from "@/features/inventory/components/create-inventory";
import { DeleteInventory } from "@/features/inventory/components/delete-inventory";
import { UpdateInventory } from "@/features/inventory/components/edit-inventory";
import { InventoryFilter } from "@/features/inventory/components/inventory-filter";
import { InventoryPagination } from "@/features/inventory/components/inventory-pagination";
import { InventoryTable } from "@/features/inventory/components/inventory-table";
import { StockHistory } from "@/features/inventory/components/stock-history";
import { StockIn } from "@/features/inventory/components/stock-in";
import { StockOut } from "@/features/inventory/components/stock-out";
import { useGetAllInventories } from "@/features/inventory/hooks";
import { getAllInventorySchema, Inventory } from "@/features/inventory/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
export default function InventoryPage() {
  const role = useAuthStore((s) => s.user?.role);
  const canManageInventory = role === "SUPER_ADMIN";
  const canManageStock = role === "SUPER_ADMIN" || role === "STORE_ADMIN";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [sortBy, sortOrder] = sort.split(":");
  const [editInventory, setEditInventory] = useState<Inventory | null>(null);
  const [deleteInventory, setDeleteInventory] = useState<Inventory | null>(
    null,
  );
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [stockInInventory, setStockInInventory] = useState<Inventory | null>(
    null,
  );
  const [stockOutInventory, setStockOutInventory] = useState<Inventory | null>(
    null,
  );
  const [historyInventory, setHistoryInventory] = useState<Inventory | null>(
    null,
  );
  const query: getAllInventorySchema = {
    page,
    limit: 10,
    search: search || undefined,
    storeId,
    sortBy: sortBy as getAllInventorySchema["sortBy"],
    sortOrder: sortOrder as getAllInventorySchema["sortOrder"],
  };
  const { data, isLoading } = useGetAllInventories(query);
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Inventory management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Inventory</h1>
          <p className="mt-1 text-sm text-stone-500">Organize inventory</p>
        </div>
        {canManageInventory && <CreateInventory />}
      </div>
      <InventoryFilter
        search={search}
        sort={sort}
        showStoreFilter={canManageInventory}
        storeId={storeId}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onStoreIdChange={(v) => {
          setStoreId(v);
          setPage(1);
        }}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <>
          <InventoryTable
            inventories={data?.data ?? []}
            canManageInventory={canManageInventory}
            canManageStock={canManageStock}
            onEdit={setEditInventory}
            onDelete={setDeleteInventory}
            onStockIn={setStockInInventory}
            onStockOut={setStockOutInventory}
            onHistory={setHistoryInventory}
          />
          {data?.meta && (
            <InventoryPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}
      {canManageInventory && (
        <>
          <UpdateInventory
            inventory={editInventory}
            onClose={() => setEditInventory(null)}
          />
          <DeleteInventory
            inventory={deleteInventory}
            onClose={() => setDeleteInventory(null)}
          />
        </>
      )}
      {canManageStock && (
        <>
      <StockIn
        inventory={stockInInventory}
        onClose={() => setStockInInventory(null)}
      />
      <StockOut
        inventory={stockOutInventory}
        onClose={() => setStockOutInventory(null)}
      />
      <StockHistory
        inventory={historyInventory}
        onClose={() => setHistoryInventory(null)}
        />
        </>
        )}
    </div>
  );
}
