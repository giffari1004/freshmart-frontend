"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const updateQuery = (changes: Partial<OrderListQuery>) => {
    setQuery((current) => ({ ...current, ...changes, ...(Object.prototype.hasOwnProperty.call(changes, "page") ? {} : { page: 1 }) }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MidtransScript />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <OrdersHeader />
        <OrderSearchControls query={query} onQueryChange={updateQuery} />
        <OrdersContent
          orders={ordersQuery.data?.items ?? []}
          pagination={ordersQuery.data?.pagination ?? emptyPagination(query)}
          isPending={ordersQuery.isPending}
          isFetching={ordersQuery.isFetching}
          isError={ordersQuery.isError}
          onPageChange={(page) => setQuery((current) => ({ ...current, page }))}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

function OrdersHeader() {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <Badge variant="secondary">My Orders</Badge>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Order history</h1>
          <p className="mt-1 text-sm text-muted-foreground">View your grocery orders and track their current status.</p>
        </div>
        <div className="hidden items-center gap-3 rounded-lg border border-border bg-accent px-4 py-3 sm:flex">
          <ClipboardList className="size-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Track every step with ease.</span>
        </div>
      </CardContent>
    </Card>
  );
}

function emptyPagination(query: OrderListQuery) {
  return { page: query.page, limit: query.limit, totalItems: 0, totalPages: 0 };
}
