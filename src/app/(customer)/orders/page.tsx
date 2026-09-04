"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { OrderSearchControls } from "@/features/order/components/OrderSearchControls";
import { OrdersContent } from "@/features/order/components/OrdersContent";
import { useOrders } from "@/features/order/hooks";
import { OrderListQuery } from "@/features/order/order.type";

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
      ...(Object.prototype.hasOwnProperty.call(changes, "page")
        ? {}
        : { page: 1 }),
    }));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.12),_transparent_28%),linear-gradient(to_bottom,_#f7fee7_0%,_#fafaf9_38%,_#fafaf9_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3.5 py-2 text-sm font-bold text-stone-600 shadow-sm backdrop-blur transition hover:border-emerald-200 hover:bg-white hover:text-emerald-800"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        <header className="mt-6 rounded-[2rem] border border-emerald-200/70 bg-white/95 p-6 shadow-[0_18px_45px_-28px_rgba(16,185,129,0.4)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                FreshMart
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">
                My Orders
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                View your recent grocery orders and their current status.
              </p>
            </div>
            <div className="hidden min-w-64 rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-4 shadow-sm sm:block">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700">
                  <ClipboardList className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-stone-400">Order journey</p>
                  <p className="mt-1 text-sm font-bold text-stone-900">Track every step with ease.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 space-y-5">
          <OrderSearchControls query={query} onQueryChange={updateQuery} />
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
            onPageChange={(page) =>
              setQuery((current) => ({ ...current, page }))
            }
          />
        </section>
      </div>
    </main>
  );
}
