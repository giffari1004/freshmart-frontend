"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { OrderSearchControls } from "@/features/order/components/OrderSearchControls";
import { OrdersContent } from "@/features/order/components/OrdersContent";
import { useOrders } from "@/features/order/hooks";
import { OrderListQuery } from "@/features/order/order.type";
import { MidtransScript } from "@/features/payment/components/MidtransScript";


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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MidtransScript />

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>

          <header className="rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex rounded-full border border-border bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  FreshMart
                </p>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  My Orders
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  View your recent grocery orders and their current status.
                </p>
              </div>

              <div className="hidden min-w-64 rounded-xl border border-border bg-muted p-4 shadow-sm sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <ClipboardList className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                      Order journey
                    </p>

                    <p className="mt-1 text-sm font-bold text-foreground">
                      Track every step with ease.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-6 space-y-5">
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
              onPageChange={(page) =>
                setQuery((current) => ({ ...current, page }))
              }
            />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}