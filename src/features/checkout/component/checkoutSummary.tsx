import { ArrowRight, Loader2, ReceiptText } from "lucide-react";
import { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutSummaryProps {
  preview?: CheckoutPreviewResponse;
  onPreview: () => void;
  onCreateOrder: () => void;
  isPreviewLoading?: boolean;
  isOrderLoading?: boolean;
  orderCreated?: boolean;
  canPreview?: boolean;
}

export function CheckoutSummary(props: CheckoutSummaryProps) {
  return (
    <aside className="relative h-fit overflow-hidden rounded-[1.75rem] border border-border bg-white/95 p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
          <ReceiptText className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Order Summary</h2>
          <p className="text-xs text-muted-foreground">Review before payment</p>
        </div>
      </div>

      {props.preview ? (
        <PreviewSummary {...props} />
      ) : (
        <EmptySummary
          onPreview={props.onPreview}
          loading={props.isPreviewLoading}
          canPreview={props.canPreview}
        />
      )}
    </aside>
  );
}

function PreviewSummary({
  preview,
  onCreateOrder,
  isOrderLoading,
  orderCreated,
}: CheckoutSummaryProps) {
  return (
    <div className="mt-6 space-y-4 text-sm">
      <SummaryRow label="Items" value={String(preview!.totalItems)} />
      <SummaryRow
        label="Subtotal"
        value={`Rp ${preview!.subtotal.toLocaleString("id-ID")}`}
      />
      <SummaryRow
        label="Discount"
        value={`- Rp ${preview!.discount.amount.toLocaleString("id-ID")}`}
        green
      />
      <SummaryRow
        label="Shipping"
        value={`Rp ${preview!.shipping.cost.toLocaleString("id-ID")}`}
      />
      <SummaryRow
        label="Distance"
        value={`${preview!.store.distanceKm.toFixed(2)} km`}
      />
      <TotalRow value={`Rp ${preview!.totalAmount.toLocaleString("id-ID")}`} />
      <OrderButton
        loading={isOrderLoading}
        created={orderCreated}
        onClick={onCreateOrder}
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
      <span className="text-muted-foreground">{label}</span>
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

function TotalRow({ value }: { value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-accent to-accent p-4">
      <div className="flex items-end justify-between gap-4">
        <span className="font-bold text-foreground">Total</span>
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
  onClick,
}: {
  loading?: boolean;
  created?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || created}
      className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary px-4 font-extrabold text-white shadow-[0_12px_25px_-14px_rgba(5,150,105,0.9)] transition hover:-translate-y-0.5 hover:from-primary hover:to-primary disabled:cursor-not-allowed disabled:opacity-50"
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

function EmptySummary({
  onPreview,
  loading,
  canPreview = false,
}: {
  onPreview: () => void;
  loading?: boolean;
  canPreview?: boolean;
}) {
  return (
    <div className="mt-6">
      <div className="space-y-4 text-sm">
        <SummaryRow label="Subtotal" value="—" />
        <SummaryRow label="Discount" value="—" />
        <SummaryRow label="Shipping" value="—" />
        <TotalRow value="—" />
      </div>
      {!canPreview ? (
        <p className="mt-4 rounded-2xl border border-border bg-gradient-to-br from-accent to-accent p-4 text-xs leading-5 text-muted-foreground">
          Select a delivery address and shipping method first.
        </p>
      ) : null}
      <button
        type="button"
        onClick={onPreview}
        disabled={loading || !canPreview}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-gradient-to-r from-accent to-accent font-extrabold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-border hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Review Order"
        )}
      </button>
    </div>
  );
}
