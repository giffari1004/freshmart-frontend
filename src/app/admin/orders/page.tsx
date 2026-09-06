"use client";

import { useState } from "react";
import { ArrowDownUp, ClipboardList } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminOrdersTable } from "@/features/order/admin/AdminOrdersTable";
import {
  useAdminOrders,
  useUpdateAdminOrderStatus,
} from "@/features/order/admin/use-admin-orders";
import {
  AdminOrderActionStatus,
  AdminOrderSortBy,
  AdminOrderSortOrder,
  AdminOrderStatus,
} from "@/features/order/admin/order-admin.type";

const STATUS_OPTIONS: Array<{
  label: string;
  value: AdminOrderStatus;
}> = [
  { label: "Waiting Payment", value: "WAITING_PAYMENT" },
  { label: "Processed", value: "PROCESSED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS: Array<{
  label: string;
  value: AdminOrderSortBy;
}> = [
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
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    status: AdminOrderActionStatus;
  } | null>(null);

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

  const handleStatusChange = (
    id: string,
    nextStatus: AdminOrderActionStatus,
  ) => {
    setPendingAction({ id, status: nextStatus });
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    updateStatus.mutate(pendingAction, {
      onSuccess: () => setPendingAction(null),
    });
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.13),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.1),_transparent_25%),linear-gradient(to_bottom,_#f7fee7_0%,_#fafaf9_34%,_#fafaf9_100%)] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-emerald-200/70 bg-white/95 p-6 shadow-[0_18px_45px_-28px_rgba(16,185,129,0.42)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                Admin
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
                Order Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage store orders and process valid order status transitions.
              </p>
            </div>
            <div className="hidden min-w-64 rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-4 shadow-sm sm:block">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
                  <ClipboardList className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-stone-400">Operations</p>
                  <p className="mt-1 text-sm font-bold text-stone-900">Keep every order moving.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-3 rounded-[1.75rem] border border-stone-200/80 bg-white/95 p-4 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] sm:grid-cols-3 sm:p-5">
          <Select value={status || "all"} onValueChange={handleFilterChange}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            className="h-11 justify-between rounded-xl border-stone-200 bg-stone-50/60 font-bold transition hover:bg-white"
            onClick={toggleSortOrder}
          >
            <span>{sortOrder === "desc" ? "Descending" : "Ascending"}</span>
            <ArrowDownUp className="size-4" />
          </Button>
        </div>

        <div className="mt-5">
          {isError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
              Unable to load admin orders.
            </div>
          ) : (
            <div className="space-y-3">
              {isFetching && !isPending ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs font-bold text-emerald-800 shadow-sm">
                  Updating order list...
                </div>
              ) : null}
              <AdminOrdersTable
                orders={data?.data.items ?? []}
                isPending={isPending || updateStatus.isPending}
                onStatusChange={handleStatusChange}
              />
            </div>
          )}
        </div>

        {totalPages > 0 ? (
          <Pagination className="mt-6">
            <PaginationContent className="rounded-2xl border border-stone-200/80 bg-white/95 p-2 shadow-md">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page <= 1 || isFetching}
                  className={
                    page <= 1 || isFetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    if (page > 1) setPage((current) => current - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-sm text-stone-500">
                  Page{" "}
                  <span className="font-semibold text-stone-900">
                    {data?.data.pagination.page ?? page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-stone-900">
                    {totalPages}
                  </span>
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page >= totalPages || isFetching}
                  className={
                    page >= totalPages || isFetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    if (page < totalPages)
                      setPage((current) => current + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>

      <Dialog
        open={Boolean(pendingAction)}
        onOpenChange={(open) => {
          if (!open && !updateStatus.isPending) setPendingAction(null);
        }}
      >
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Change order status?</DialogTitle>
            <DialogDescription>
              {pendingAction
                ? `The order will move to ${pendingAction.status.replaceAll("_", " ")}. Confirm to continue.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingAction(null)}
              disabled={updateStatus.isPending}
            >
              Keep Order
            </Button>
            <Button
              type="button"
              onClick={handleConfirmAction}
              disabled={updateStatus.isPending}
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              {updateStatus.isPending ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
