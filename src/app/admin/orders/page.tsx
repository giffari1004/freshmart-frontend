"use client";

import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminOrdersTable } from "@/features/order/admin/AdminOrdersTable";
import { useAdminOrders, useUpdateAdminOrderStatus } from "@/features/order/admin/use-admin-orders";
import { AdminOrderActionStatus, AdminOrderSortBy, AdminOrderSortOrder, AdminOrderStatus } from "@/features/order/admin/order-admin.type";

const STATUS_OPTIONS: Array<{ label: string; value: AdminOrderStatus }> = [
  { label: "Waiting Payment", value: "WAITING_PAYMENT" },
  { label: "Paid", value: "PAID" },
  { label: "Processed", value: "PROCESSED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS: Array<{ label: string; value: AdminOrderSortBy }> = [
  { label: "Created At", value: "createdAt" },
  { label: "Total Amount", value: "totalAmount" },
  { label: "Order Number", value: "orderNumber" },
  { label: "Status", value: "status" },
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AdminOrderStatus | "">("");
  const [sortBy, setSortBy] = useState<AdminOrderSortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<AdminOrderSortOrder>("desc");
  const [pendingAction, setPendingAction] = useState<{ id: string; status: AdminOrderActionStatus } | null>(null);

  const { data, isPending, isError, isFetching } = useAdminOrders(
    page,
    status || undefined,
    sortBy,
    sortOrder,
  );
  const updateStatus = useUpdateAdminOrderStatus();
  const totalPages = data?.data.pagination.totalPages ?? 0;

  const handleFilterChange = (value: string) => {
    setStatus(value === "all" ? "" : (value as AdminOrderStatus));
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as AdminOrderSortBy);
    setPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((current) => (current === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  const handleStatusChange = (id: string, nextStatus: AdminOrderActionStatus) => {
    setPendingAction({ id, status: nextStatus });
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    updateStatus.mutate(pendingAction, {
      onSuccess: () => setPendingAction(null),
    });
  };

  return (
    <section className="min-h-screen bg-stone-50 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-medium text-emerald-700">Order Management</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">Orders</h1>
          <p className="mt-2 text-sm text-stone-500">Manage store orders and process valid order status transitions.</p>
        </header>

        <div className="mt-8 grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-3">
          <Select value={status || "all"} onValueChange={handleFilterChange}>
            <SelectTrigger><SelectValue placeholder="Filter status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Button type="button" variant="outline" className="h-10 justify-between" onClick={toggleSortOrder}>
            <span>{sortOrder === "desc" ? "Descending" : "Ascending"}</span>
            <ArrowDownUp className="size-4" />
          </Button>
        </div>

        <div className="mt-6">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">Unable to load admin orders.</div>
          ) : (
            <div className="space-y-3">
              {isFetching && !isPending ? <p className="text-xs text-stone-500">Updating order list...</p> : null}
              <AdminOrdersTable
                orders={data?.data.items ?? []}
                isPending={isPending || updateStatus.isPending}
                onStatusChange={handleStatusChange}
              />
            </div>
          )}
        </div>

        {totalPages > 0 ? (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" aria-disabled={page <= 1 || isFetching} className={page <= 1 || isFetching ? "pointer-events-none opacity-50" : ""} onClick={(event) => { event.preventDefault(); if (page > 1) setPage((current) => current - 1); }} />
              </PaginationItem>
              <PaginationItem><span className="px-4 text-sm text-stone-500">Page {data?.data.pagination.page ?? page} of {totalPages}</span></PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" aria-disabled={page >= totalPages || isFetching} className={page >= totalPages || isFetching ? "pointer-events-none opacity-50" : ""} onClick={(event) => { event.preventDefault(); if (page < totalPages) setPage((current) => current + 1); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>

      <Dialog open={Boolean(pendingAction)} onOpenChange={(open) => { if (!open && !updateStatus.isPending) setPendingAction(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change order status?</DialogTitle>
            <DialogDescription>
              {pendingAction ? `The order will move to ${pendingAction.status.replaceAll("_", " ")}. Confirm to continue.` : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setPendingAction(null)} disabled={updateStatus.isPending}>Keep Order</Button>
            <Button type="button" onClick={handleConfirmAction} disabled={updateStatus.isPending}>{updateStatus.isPending ? "Updating..." : "Confirm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
