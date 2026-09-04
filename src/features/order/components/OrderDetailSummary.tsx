import { ReceiptText } from "lucide-react";
import { OrderDetail } from "../order.type";

export function OrderDetailSummary({
  order,
}: {
  order: OrderDetail;
}) {
  return (
    <section className="rounded-[1.65rem] border border-border bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
          <ReceiptText className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">Order Summary</h2>
          <p className="text-sm text-muted-foreground">Final order calculation.</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value={order.subtotal} />
        <SummaryRow label="Discount" value={-order.discountAmount} />
        <SummaryRow label="Shipping" value={order.shippingCost} />
        <div className="rounded-2xl border border-border bg-gradient-to-br from-accent to-accent p-4">
          <SummaryRow label="Total" value={order.totalAmount} strong />
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-bold text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
      <span
        className={
          strong
            ? "text-2xl font-black tracking-tight text-foreground"
            : "font-semibold text-foreground"
        }
      >
        Rp {value.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
