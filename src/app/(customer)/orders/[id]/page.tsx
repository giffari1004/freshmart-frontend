"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useOrderDetail } from "@/features/order/hooks";
import { OrderDetailContent } from "@/features/order/components/OrderDetailContent";
import { getOrderErrorMessage } from "@/features/order/order-error";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id ?? "";
  const query = useOrderDetail(orderId);

  if (query.isPending) {
    return (
      <main className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex items-center gap-2 rounded-2xl bg-white p-6 text-sm text-stone-500 shadow-sm">
            <Loader2 className="size-4 animate-spin" />
            Loading order details...
          </div>
        </div>
      </main>
    );
  }

  if (query.isError || !query.data) {
    return (
      <main className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Unable to load this order.</p>
            <p className="mt-1 text-sm">{getOrderErrorMessage(query.error, "Order not found or unavailable")}</p>
            <Link href="/orders" className="mt-4 inline-flex rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>
      </div>
      <OrderDetailContent order={query.data} />
    </div>
  );
}
