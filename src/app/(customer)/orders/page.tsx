"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { OrdersContent } from "@/features/order/components/OrdersContent";
import { useOrders } from "@/features/order/hooks";
import {
  OrderListQuery,
  OrderListSortBy,
  OrderListSortOrder,
  OrderListStatus,
} from "@/features/order/order.type";

const ORDER_STATUS_OPTIONS: Array<{ label: string; value: OrderListStatus }> = [
  { label: "Waiting Payment", value: "WAITING_PAYMENT" },
  { label: "Paid", value: "PAID" },
  { label: "Processed", value: "PROCESSED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS: Array<{ label: string; value: OrderListSortBy }> = [
  { label: "Newest", value: "createdAt" },
  { label: "Total Amount", value: "totalAmount" },
  { label: "Order Number", value: "orderNumber" },
  { label: "Status", value: "status" },
];

export default function OrdersPage() {
  const [query, setQuery] = useState<OrderListQuery>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const ordersQuery = useOrders(query);
  const data = ordersQuery.data;

  const updateQuery = (changes: Partial<OrderListQuery>) => {
    setQuery((current) => ({
      ...current,
      ...changes,
      ...(Object.prototype.hasOwnProperty.call(changes, "page") ? {} : { page: 1 }),
    }));
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-emerald-700">Orders</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
            My Orders
          </h1>
          <p className="mt-2 text-stone-500">
            View your recent grocery orders and their current status.
          </p>
        </header>

        <section className="mt-8 space-y-5">
          <OrderListControls
            query={query}
            onStatusChange={(status) => updateQuery({ status: status || undefined })}
            onSortChange={(sortBy) => updateQuery({ sortBy })}
            onSortOrderChange={(sortOrder) => updateQuery({ sortOrder })}
          />

          <OrdersContent
            orders={data?.items ?? []}
            pagination={
              data?.pagination ?? {
                page: query.page,
                limit: query.limit,
                totalItems: 0,
                totalPages: 0,
              }
            }
            isPending={ordersQuery.isPending}
            isFetching={ordersQuery.isFetching}
            isError={ordersQuery.isError}
            onPageChange={(page) => setQuery((current) => ({ ...current, page }))}
          />
        </section>
      </div>
    </main>
  );
}

function OrderListControls({
  query,
  onStatusChange,
  onSortChange,
  onSortOrderChange,
}: {
  query: OrderListQuery;
  onStatusChange: (value: "" | OrderListStatus) => void;
  onSortChange: (value: OrderListSortBy) => void;
  onSortOrderChange: (value: OrderListSortOrder) => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-3">
      <label className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Status
        </span>
        <select
          value={query.status ?? ""}
          onChange={(event) =>
            onStatusChange(event.target.value as "" | OrderListStatus)
          }
          className="h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none ring-0 focus:border-emerald-600"
        >
          <option value="">All statuses</option>
          {ORDER_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Sort By
        </span>
        <select
          value={query.sortBy}
          onChange={(event) => onSortChange(event.target.value as OrderListSortBy)}
          className="h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Direction
        </span>
        <select
          value={query.sortOrder}
          onChange={(event) =>
            onSortOrderChange(event.target.value as OrderListSortOrder)
          }
          className="h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}
