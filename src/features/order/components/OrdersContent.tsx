import { Loader2, PackageOpen } from "lucide-react";
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

export function OrdersContent({
  orders,
  pagination,
  isPending,
  isFetching,
  isError,
  onPageChange,
  detailBasePath = "/orders",
}: OrdersContentProps) {
  if (isPending) {
    return (
      <div className="flex items-center gap-3 rounded-[1.6rem] border border-border bg-white/95 p-6 text-sm font-semibold text-muted-foreground shadow-sm">
        <Loader2 className="size-4 animate-spin text-primary" />
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[1.6rem] border border-red-200 bg-red-50/90 p-6 text-red-700 shadow-sm">
        <p className="font-semibold">Unable to load orders.</p>
        <p className="mt-1 text-sm leading-6">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!orders.length) return <EmptyOrders />;

  return (
    <div className="space-y-5">
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
  detailBasePath?: string;
}) {
  const { page, totalPages } = pagination;
  const pages = buildPageNumbers(page, totalPages);

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{page}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
        {isFetching ? " · Updating..." : ""}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={page <= 1 || isFetching}
          onClick={() => onPageChange(page - 1)}
          className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-border hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((value, index) =>
          value === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={value}
              type="button"
              disabled={isFetching}
              onClick={() => onPageChange(value)}
              className={
                value === page
                  ? "rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm"
                  : "rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-border hover:bg-accent disabled:opacity-40"
              }
            >
              {value}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page >= totalPages || isFetching}
          onClick={() => onPageChange(page + 1)}
          className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-border hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function buildPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "..."> = [];

  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) result.push("...");
    result.push(value);
  });

  return result;
}

function EmptyOrders() {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-border bg-white/95 p-12 text-center shadow-sm">
      <div className="mx-auto flex size-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
        <PackageOpen className="size-7" />
      </div>
      <p className="mt-4 font-bold text-foreground">No orders found</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Try changing the filter or create your first grocery order.
      </p>
    </div>
  );
}
