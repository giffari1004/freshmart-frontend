"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import {
  CheckoutHeader,
  CheckoutAlerts,
  CheckoutAddress,
  CheckoutItems,
  CheckoutShipping,
  CheckoutVoucher,
  CheckoutSummary,
} from "@/features/checkout/component";
import { useCheckoutFlow } from "@/features/checkout/hooks/useCheckoutFlow";
import {
  MidtransPayment,
  MidtransScript,
} from "@/features/payment/components";

export default function CheckoutPage() {
  const flow = useCheckoutFlow();

  return <CheckoutLayout flow={flow} />;
}

function CheckoutLayout({
  flow,
}: {
  flow: ReturnType<typeof useCheckoutFlow>;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MidtransScript />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
        <BackLink />
        <CheckoutHeader />

        <CheckoutAlerts
          checkoutError={flow.preview.isError}
          orderError={flow.order.isError}
          paymentError={flow.payment.isError}
          orderNumber={flow.order.data?.orderNumber}
          orderStatus={flow.order.data?.status}
        />

        <CheckoutContent flow={flow} />

        <SecurityNotice />
      </div>

      {flow.snapToken && flow.createdOrderId ? (
        <MidtransPayment
          snapToken={flow.snapToken}
          orderId={flow.createdOrderId}
        />
      ) : null}
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary"
    >
      <ArrowLeft className="size-4" />
      Back to Cart
    </Link>
  );
}

function CheckoutContent({
  flow,
}: {
  flow: ReturnType<typeof useCheckoutFlow>;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="space-y-5 lg:col-span-2">
        <CheckoutAddress
          addressId={flow.addressId}
          addresses={flow.addresses.data ?? []}
          onChange={flow.changeAddress}
          disabled={flow.disabled}
          isLoading={flow.addresses.isLoading}
          isError={flow.addresses.isError}
        />

        <CheckoutItems preview={flow.preview.data} />

        <CheckoutShipping
          shippingMethodId={flow.shippingMethodId}
          shippingMethods={flow.shippingOptions.data ?? []}
          preview={flow.preview.data}
          onChange={flow.changeShipping}
          disabled={flow.disabled || !flow.addressId}
          isLoading={flow.shippingOptions.isLoading}
          isError={flow.shippingOptions.isError}
        />

        <CheckoutVoucher
          value={flow.userVoucherId}
          onChange={flow.changeVoucher}
          disabled={flow.disabled}
        />
      </div>

      <CheckoutSummary
        preview={flow.preview.data}
        cart={flow.cart.data}
        onCreateOrder={flow.handleCreateOrder}
        isOrderLoading={
          flow.order.isPending || flow.payment.isPending
        }
        orderCreated={
          flow.order.isSuccess && !!flow.snapToken
        }
        canCreateOrder={flow.canCreateOrder}
      />
    </div>
  );
}

function SecurityNotice() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-xs text-muted-foreground shadow-sm">
      <ShieldCheck className="size-4 shrink-0 text-primary" />
      Secure payment is handled through the Midtrans checkout window.
    </div>
  );
}