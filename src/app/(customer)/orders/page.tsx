"use client";

import Link from "next/link";
import { useState } from "react";
import { OrderSearchControls } from "@/features/order/components/OrderSearchControls";
import { ArrowLeft } from "lucide-react";
import { OrdersContent } from "@/features/order/components/OrdersContent";
import { useOrders } from "@/features/order/hooks";
import {
  OrderListQuery,
  OrderListSortBy,
  OrderListSortOrder,
  OrderListStatus,
} from "@/features/order/order.type";

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
          <OrderSearchControls
            query={query}
            onQueryChange={updateQuery}
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

