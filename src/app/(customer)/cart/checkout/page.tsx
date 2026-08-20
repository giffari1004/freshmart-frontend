"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
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
      </div>
      {flow.snapToken && <MidtransPayment snapToken={flow.snapToken} />}
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
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
    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <CheckoutAddress
          addressId={flow.addressId}
          onChange={flow.changeAddress}
          disabled={flow.disabled}
        />
        <CheckoutItems preview={flow.preview.data} />
        <CheckoutShipping
          shippingMethodId={flow.shippingMethodId}
          preview={flow.preview.data}
          onChange={flow.changeShipping}
          disabled={flow.disabled}
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
      />
    </div>
  );
}
