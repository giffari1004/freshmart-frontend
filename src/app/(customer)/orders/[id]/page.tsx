"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { useOrderDetail } from "@/features/order/hooks";
import { OrderDetailContent } from "@/features/order/components/OrderDetailContent";
import { getOrderErrorMessage } from "@/features/order/order-error";
import { MidtransScript } from "@/features/payment/components/MidtransScript";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id ?? "";
  const query = useOrderDetail(orderId);

  if (query.isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <main className="min-h-screen bg-background text-foreground">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-6 text-sm font-medium text-muted-foreground shadow-sm">
              <Loader2 className="size-4 animate-spin text-primary" />
              Loading order details...
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <main className="min-h-screen bg-background text-foreground">
          <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-4 py-6 md:px-8">
            <div className="w-full rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-destructive shadow-sm sm:p-8">
              <p className="font-bold">Unable to load this order.</p>

              <p className="mt-1 text-sm leading-6">
                {getOrderErrorMessage(
                  query.error,
                  "Order not found or unavailable",
                )}
              </p>

              <Link
                href="/orders"
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MidtransScript />

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to Orders
          </Link>
        </div>

        <OrderDetailContent order={query.data} />
      </main>

      <SiteFooter />
    </div>
  );
}