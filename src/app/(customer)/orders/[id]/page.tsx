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
      <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex items-center gap-3 rounded-3xl border border-stone-200/80 bg-white p-6 text-sm font-medium text-stone-500 shadow-sm">
            <Loader2 className="size-4 animate-spin text-emerald-600" />
            Loading order details...
          </div>
        </div>
      </main>
    );
  }

  if (query.isError || !query.data) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50/40 via-stone-50 to-stone-50">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center px-4 py-10">
          <div className="w-full rounded-3xl border border-red-200 bg-white p-6 text-red-700 shadow-sm sm:p-8">
            <p className="font-bold">Unable to load this order.</p>
            <p className="mt-1 text-sm leading-6">
              {getOrderErrorMessage(
                query.error,
                "Order not found or unavailable",
              )}
            </p>
            <Link
              href="/orders"
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:pt-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-stone-500 transition hover:bg-white hover:text-stone-900"
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>
      </div>
      <OrderDetailContent order={query.data} />
    </div>
  );
}
