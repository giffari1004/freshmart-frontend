"use client";

import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminOrdersTable } from "@/features/order/admin/AdminOrdersTable";
import { AdminOrderStatusDialog } from "@/features/order/admin/AdminOrderStatusDialog";
import { useAdminOrdersPage } from "@/features/order/admin/use-admin-orders-page";
import { AdminOrderSortBy, AdminOrderStatus } from "@/features/order/admin/order-admin.type";

const STATUS_OPTIONS = ["WAITING_PAYMENT", "PROCESSED", "SHIPPED", "CONFIRMED", "CANCELLED"] as const;
const SORT_OPTIONS: { label: string; value: AdminOrderSortBy }[] = [
  { label: "Created At", value: "createdAt" },
  { label: "Total Amount", value: "totalAmount" },
  { label: "Order Number", value: "orderNumber" },
  { label: "Status", value: "status" },
];

export default function AdminOrdersPage() {
  const view = useAdminOrdersPage();
  const changeStatus = (value: string) => { view.setStatus(value === "all" ? "" : value as AdminOrderStatus); view.setPage(1); };
  const changeSort = (value: string) => { view.setSortBy(value as AdminOrderSortBy); view.setPage(1); };
  const toggleSort = () => { view.setSortOrder(view.sortOrder === "desc" ? "asc" : "desc"); view.setPage(1); };
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <OrdersHeader />
      <OrdersFilters view={view} onStatusChange={changeStatus} onSortChange={changeSort} onSortOrderChange={toggleSort} />
      <OrdersContent view={view} />
      <OrdersPagination view={view} />
      <AdminOrderStatusDialog action={view.pendingAction} isPending={view.updateStatus.isPending} onClose={() => view.setPendingAction(null)} onConfirm={() => confirmOrderAction(view)} />
    </div>
  );
}

function OrdersHeader() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Order management</p>
      <h1 className="mt-1 font-serif text-3xl text-stone-900">Orders</h1>
      <p className="mt-1 text-sm text-stone-500">Manage store orders and process valid order status transitions</p>
    </div>
  );
}

function OrdersFilters({ view, onStatusChange, onSortChange, onSortOrderChange }: { view: ReturnType<typeof useAdminOrdersPage>; onStatusChange: (value: string) => void; onSortChange: (value: string) => void; onSortOrderChange: () => void }) {
  return (
    <div className="grid gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:grid-cols-3">
      <StatusFilter value={view.status} onChange={onStatusChange} />
      <SortFilter value={view.sortBy} onChange={onSortChange} />
      <Button variant="outline" className="h-10 justify-between rounded-lg text-sm font-medium" onClick={onSortOrderChange}>
        {view.sortOrder === "desc" ? "Descending" : "Ascending"}<ArrowDownUp className="size-4" />
      </Button>
    </div>
  );
}

function StatusFilter({ value, onChange }: { value: AdminOrderStatus | ""; onChange: (value: string) => void }) {
  return (
    <Select value={value || "all"} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-lg text-sm"><SelectValue placeholder="All statuses" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All statuses</SelectItem>
        {STATUS_OPTIONS.map((status) => <SelectItem key={status} value={status}>{status.replaceAll("_", " ")}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function SortFilter({ value, onChange }: { value: AdminOrderSortBy; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-lg text-sm"><SelectValue placeholder="Sort by" /></SelectTrigger>
      <SelectContent>{SORT_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function OrdersContent({ view }: { view: ReturnType<typeof useAdminOrdersPage> }) {
  if (view.orders.isError) return <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">Unable to load admin orders.</p>;
  return <AdminOrdersTable orders={view.orders.data?.data.items ?? []} isPending={view.orders.isPending || view.updateStatus.isPending} onStatusChange={(id, status) => view.setPendingAction({ id, status })} />;
}

function OrdersPagination({ view }: { view: ReturnType<typeof useAdminOrdersPage> }) {
  const totalPages = view.orders.data?.data.pagination.totalPages ?? 0;
  if (!totalPages) return null;
  return (
    <div className="flex items-center justify-center gap-4 text-sm text-stone-500">
      <Button variant="ghost" size="sm" disabled={view.page <= 1 || view.orders.isFetching} onClick={() => view.setPage(view.page - 1)}>Previous</Button>
      <span>Page {view.page} of {totalPages}</span>
      <Button variant="ghost" size="sm" disabled={view.page >= totalPages || view.orders.isFetching} onClick={() => view.setPage(view.page + 1)}>Next</Button>
    </div>
  );
}

function confirmOrderAction(view: ReturnType<typeof useAdminOrdersPage>) {
  if (!view.pendingAction) return;
  view.updateStatus.mutate(view.pendingAction, { onSuccess: () => view.setPendingAction(null) });
}
