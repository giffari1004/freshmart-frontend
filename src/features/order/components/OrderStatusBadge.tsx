import { cn } from "@/lib/utils";
import type { OrderStatus } from "../order.type";

const labels: Record<OrderStatus, string> = {
  WAITING_PAYMENT: "Waiting Payment",
  PAID: "Paid",
  PROCESSED: "Processed",
  SHIPPED: "Shipped",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};

const styles: Record<OrderStatus, string> = {
  WAITING_PAYMENT: "bg-amber-50 text-amber-700 ring-amber-200",
  PAID: "bg-sky-50 text-sky-700 ring-sky-200",
  PROCESSED: "bg-violet-50 text-violet-700 ring-violet-200",
  SHIPPED: "bg-primary/10 text-primary ring-border",
  CONFIRMED: "bg-accent text-primary ring-border",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
};

export function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ring-1 ring-inset",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
