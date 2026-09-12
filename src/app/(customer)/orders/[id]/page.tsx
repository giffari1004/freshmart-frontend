"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { useOrderDetail } from "@/features/order/hooks";
import { OrderDetailContent } from "@/features/order/components/OrderDetailContent";
import { getOrderErrorMessage } from "@/features/order/order-error";
import { MidtransScript } from "@/features/payment/components/MidtransScript";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const query = useOrderDetail(params.id ?? "");

  if (query.isPending) return <PageShell><DetailState loading /></PageShell>;
  if (query.isError || !query.data) return <PageShell><DetailState error={query.error} /></PageShell>;
  return <PageShell><OrderDetailContent order={query.data} /></PageShell>;
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MidtransScript />
      {children}
      <SiteFooter />
    </div>
  );
}

function DetailState({ loading = false, error }: { loading?: boolean; error?: unknown }) {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-7xl items-center px-4 py-6 md:px-8">
      <Card className="w-full shadow-sm">
        <CardContent className="p-6 sm:p-8">
          {loading ? <LoadingMessage /> : <ErrorMessage error={error} />}
        </CardContent>
      </Card>
    </main>
  );
}

function LoadingMessage() {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
      <Loader2 className="size-4 animate-spin text-primary" /> Loading order details...
    </div>
  );
}

function ErrorMessage({ error }: { error?: unknown }) {
  return (
    <div>
      <p className="font-semibold text-destructive">Unable to load this order.</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {getOrderErrorMessage(error, "Order not found or unavailable")}
      </p>
      <Button asChild className="mt-5">
        <Link href="/orders">Back to Orders</Link>
      </Button>
    </div>
  );
}
