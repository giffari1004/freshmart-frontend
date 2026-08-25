import { PackageOpen } from "lucide-react";
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
    return <p className="rounded-2xl bg-white p-6 text-stone-500">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Unable to load orders. Please try again.
      </p>
    );
  }

  if (!orders.length) return <EmptyOrders />;

  return (
    <div className="space-y-5">
      <OrderList orders={orders} detailBasePath={detailBasePath} />

      {pagination.totalPages > 1 && (
        <OrderPagination
          pagination={pagination}
          isFetching={isFetching}
          onPageChange={onPageChange}
        />
      )}
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
    <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-stone-500">
        Page {page} of {totalPages}
        {isFetching ? " · Updating..." : ""}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={page <= 1 || isFetching}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((value, index) =>
          value === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-stone-400">
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
                  ? "rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
                  : "rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40"
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
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function buildPageNumbers(currentPage: number, totalPages: number): Array<number | "..."> {
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
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
      <PackageOpen className="mx-auto size-10 text-stone-400" />
      <p className="mt-3 font-semibold text-stone-900">No orders found</p>
      <p className="mt-1 text-sm text-stone-500">
        Try changing the filter or create your first grocery order.
      </p>
    </div>
  );
}
