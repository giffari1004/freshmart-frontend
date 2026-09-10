import {
  ArrowRight,
  Loader2,
  ReceiptText,
} from "lucide-react";
import type { CartResponse } from "@/features/cart/cartType";
import type { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutSummaryProps {
  preview?: CheckoutPreviewResponse;
  cart?: CartResponse;
  onCreateOrder: () => void;
  isOrderLoading?: boolean;
  orderCreated?: boolean;
  canCreateOrder?: boolean;
}

export function CheckoutSummary(
  props: CheckoutSummaryProps,
) {
  const values = getSummaryValues(
    props.preview,
    props.cart,
  );

  return (
    <aside className="relative h-fit overflow-hidden rounded-[1.75rem] border border-border bg-white/95 p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <SummaryHeader />
      <SummaryRows
        preview={props.preview}
        values={values}
      />
      <OrderButton
        loading={props.isOrderLoading}
        created={props.orderCreated}
        disabled={!props.canCreateOrder}
        onClick={props.onCreateOrder}
      />
    </aside>
  );
}

function getSummaryValues(
  preview?: CheckoutPreviewResponse,
  cart?: CartResponse,
) {
  const subtotal =
    preview?.subtotal ??
    cart?.subtotal ??
    0;

  const discount =
    preview?.discount.amount ?? 0;

  const shipping =
    preview?.shipping.cost ?? 0;

  const total =
    preview?.totalAmount ??
    subtotal - discount;

  return {
    subtotal,
    discount,
    shipping,
    total,
  };
}

function SummaryHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
        <ReceiptText className="size-5" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground">
          Order Summary
        </h2>

        <p className="text-xs text-muted-foreground">
          Your current order total
        </p>
      </div>
    </div>
  );
}

function SummaryRows({
  preview,
  values,
}: {
  preview?: CheckoutPreviewResponse;
  values: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
}) {
  return (
    <div className="mt-6 space-y-4 text-sm">
      <SummaryRow
        label="Items"
        value={String(
          preview?.totalItems ?? "—",
        )}
      />

      <SummaryRow
        label="Subtotal"
        value={formatPrice(values.subtotal)}
      />

      <SummaryRow
        label="Discount"
        value={`- ${formatPrice(values.discount)}`}
        green
      />

      <SummaryRow
        label="Shipping"
        value={
          preview
            ? formatPrice(values.shipping)
            : "—"
        }
      />

      {preview?.store ? (
        <SummaryRow
          label="Distance"
          value={`${preview.store.distanceKm.toFixed(2)} km`}
        />
      ) : null}

      <TotalRow
        value={formatPrice(values.total)}
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span
        className={
          green
            ? "font-semibold text-primary"
            : "font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

function TotalRow({
  value,
}: {
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-accent to-accent p-4">
      <div className="flex items-end justify-between gap-4">
        <span className="font-bold text-foreground">
          Total
        </span>

        <span className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

function OrderButton({
  loading,
  created,
  disabled,
  onClick,
}: {
  loading?: boolean;
  created?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || created || disabled}
      className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary px-4 font-extrabold text-white shadow-[0_12px_25px_-14px_rgba(5,150,105,0.9)] transition hover:-translate-y-0.5 hover:from-primary hover:to-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Processing...
        </>
      ) : created ? (
        "Order Created"
      ) : (
        <>
          Continue to Payment
          <ArrowRight className="size-4" />
        </>
      )}
    </button>
  );
}

function formatPrice(
  price: number,
) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}