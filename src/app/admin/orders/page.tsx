"use client";

import { useState } from "react";
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
  AdminOrderStatus,
} from "@/features/order/admin/order-admin.type";

const STATUS_OPTIONS: AdminOrderStatus[] = [
  "WAITING_PAYMENT",
  "PAID",
  "WAITING_CONFIRMATION",
  "PROCESSED",
  "SHIPPED",
  "CONFIRMED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AdminOrderStatus | "">("");
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    status: AdminOrderActionStatus;
  } | null>(null);

  const { data, isPending, isError } = useAdminOrders(
    page,
    status || undefined,
  );

  const updateStatus = useUpdateAdminOrderStatus();
  const totalPages = data?.meta.totalPages ?? 0;

  const handleFilterChange = (value: string) => {
    setStatus(value === "all" ? "" : (value as AdminOrderStatus));
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
    <section className="min-h-screen bg-stone-50 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-medium text-emerald-700">Order Management</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
            Orders
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Manage store orders and process valid order status transitions.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-4">
          <Select value={status || "all"} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Unable to load admin orders.
            </div>
          ) : (
            <AdminOrdersTable
              orders={data?.data ?? []}
              isPending={isPending || updateStatus.isPending}
              onStatusChange={handleStatusChange}
              onCancel={(id) => setPendingAction({ id, status: "CANCELLED" })}
            />
          )}
        </div>

        {totalPages > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page <= 1}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    if (page > 1) setPage((current) => current - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-sm text-stone-500">
                  Page {data?.meta.page ?? page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page >= totalPages}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    if (page < totalPages) setPage((current) => current + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <Dialog
        open={Boolean(pendingAction)}
        onOpenChange={(open) => {
          if (!open && !updateStatus.isPending) setPendingAction(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingAction?.status === "CANCELLED"
                ? "Cancel this order?"
                : `Change order status to ${pendingAction?.status ?? ""}?`}
            </DialogTitle>
            <DialogDescription>
              The action will be sent to the backend and enforced again by the
              order business rules.
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
              variant={pendingAction?.status === "CANCELLED" ? "destructive" : "default"}
              onClick={handleConfirmAction}
              disabled={updateStatus.isPending}
            >
              {updateStatus.isPending ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
