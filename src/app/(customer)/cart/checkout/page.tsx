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
import { MidtransPayment } from "@/features/payment/components";

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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-stone-50 to-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
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

        <div className="mt-8 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-xs text-stone-500 shadow-sm">
          <ShieldCheck className="size-4 shrink-0 text-emerald-700" />
          Secure payment is handled through the Midtrans checkout window.
        </div>
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
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-stone-500 transition hover:bg-white hover:text-stone-900"
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
    <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">
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
        onPreview={flow.handlePreview}
        onCreateOrder={flow.handleCreateOrder}
        isPreviewLoading={flow.preview.isPending}
        isOrderLoading={flow.order.isPending || flow.payment.isPending}
        orderCreated={flow.order.isSuccess && !!flow.snapToken}
        canPreview={flow.canPreview}
      />
    </div>
  );
}
