 "use client";

import { useState } from "react";
import { AdminOrdersTable } from "@/features/order/admin/AdminOrdersTable";
import { useAdminOrders, useUpdateAdminOrderStatus } from "@/features/order/admin/use-admin-orders";
import { AdminOrderStatus } from "@/features/order/admin/order-admin.type";

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { data, isPending, isError } = useAdminOrders(page, status || undefined);
  const updateStatus = useUpdateAdminOrderStatus();

  const handleStatusChange = (id: string, nextStatus: AdminOrderStatus) => {
    updateStatus.mutate({ id, status: nextStatus });
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Order management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">Orders</h1>
        <p className="mt-1 text-sm text-stone-500">
          Process customer orders for your store.
        </p>
      </header>

      <div className="flex gap-2">
        {["", "PAID", "PROCESSING", "SHIPPED", "CANCELLED"].map((value) => (
          <button
            key={value || "all"}
            type="button"
            onClick={() => {
              setStatus(value);
              setPage(1);
            }}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
              status === value ? "bg-emerald-700 text-white" : "bg-white text-stone-600"
            }`}
          >
            {value || "ALL"}
          </button>
        ))}
      </div>

      {isPending && <p className="text-sm text-stone-500">Loading orders...</p>}
      {isError && <p className="text-sm text-red-600">Unable to load orders.</p>}
      {data && (
        <>
          <AdminOrdersTable
            orders={data.data}
            isPending={updateStatus.isPending}
            onStatusChange={handleStatusChange}
          />
          <div className="flex items-center justify-between text-sm text-stone-500">
            <span>Page {data.meta.page} of {data.meta.totalPages || 1}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage((v) => v - 1)} className="rounded-lg border px-3 py-2 disabled:opacity-40">Previous</button>
              <button disabled={page >= data.meta.totalPages} onClick={() => setPage((v) => v + 1)} className="rounded-lg border px-3 py-2 disabled:opacity-40">Next</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
