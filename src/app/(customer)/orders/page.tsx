"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrdersContent } from "@/features/order/components/OrdersContent";
import { useOrders } from "@/features/order/hooks";

export default function OrdersPage() {
  const { data: orders = [], isPending, isError } = useOrders();
  return <OrdersPageLayout orders={orders} isPending={isPending} isError={isError} />;
}

function OrdersPageLayout({ orders, isPending, isError }: { orders: import("@/features/order/order.type").OrderListItem[]; isPending: boolean; isError: boolean }) {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900"><ArrowLeft className="size-4" />Back</Link>
        <header className="mt-8">
          <p className="text-sm font-medium text-emerald-700">Orders</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">My Orders</h1>
          <p className="mt-2 text-stone-500">View your recent grocery orders and their current status.</p>
        </header>
        <section className="mt-8"><OrdersContent orders={orders} isPending={isPending} isError={isError} /></section>
      </div>
    </main>
  );
}
