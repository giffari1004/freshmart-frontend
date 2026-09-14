import type { ReactNode } from "react";
import { Loader2, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderList } from "./OrderList";
import { OrderListItem, OrderListPagination } from "../order.type";

interface OrdersContentProps {
  orders: OrderListItem[];
  pagination: OrderListPagination;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  onPageChange: (page: number) => void;
  detailBasePath?: string;
}

export function OrdersContent(props: OrdersContentProps) {
  if (props.isPending) return <LoadingState />;
  if (props.isError) return <ErrorState />;
  if (!props.orders.length) return <EmptyOrders />;
  return <OrdersResult {...props} />;
}

function LoadingState() {
  return (
    <StateCard>
      <Loader2 className="size-4 animate-spin text-primary" />
      Loading orders...
    </StateCard>
  );
}

function ErrorState() {
  return (
    <StateCard className="border-destructive/30 bg-destructive/5 text-destructive">
      <div>
        <p className="font-semibold">Unable to load orders.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please refresh the page and try again.
        </p>
      </div>
    </StateCard>
  );
}

function StateCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border border-border bg-background p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function OrdersResult({
  orders,
  pagination,
  isFetching,
  onPageChange,
  detailBasePath,
}: OrdersContentProps) {
  return (
    <div className="space-y-4">
      <OrderList orders={orders} detailBasePath={detailBasePath} />
      {pagination.totalPages > 1 ? (
        <OrderPagination
          pagination={pagination}
          isFetching={isFetching}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}

function OrderPagination({
  pagination,
  isFetching,
  onPageChange,
}: {
  pagination: OrderListPagination;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}) {
  const pages = buildPageNumbers(pagination.page, pagination.totalPages);
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{pagination.page}</span>{" "}
        of <span className="font-semibold text-foreground">{pagination.totalPages}</span>
        {isFetching ? " · Updating..." : ""}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page <= 1 || isFetching}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">…</span>
          ) : (
            <Button
              key={page}
              size="sm"
              variant={page === pagination.page ? "default" : "outline"}
              disabled={isFetching}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page >= pagination.totalPages || isFetching}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function buildPageNumbers(currentPage: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const values = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const sorted = [...values].filter((page) => page > 0 && page <= totalPages).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => index && page - sorted[index - 1] > 1 ? ["...", page] : [page]);
}

function EmptyOrders() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-background p-10 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-accent text-primary">
        <PackageOpen className="size-6" />
      </div>
      <p className="mt-4 font-semibold text-foreground">No orders found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try changing the filter or create your first grocery order.
      </p>
    </div>
  );
}
