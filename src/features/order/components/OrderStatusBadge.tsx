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
  WAITING_PAYMENT: "bg-warning/15 text-warning-foreground ring-warning/30",
  PAID: "bg-success/15 text-success-foreground ring-success/30",
  PROCESSED: "bg-accent text-primary ring-border",
  SHIPPED: "bg-primary/10 text-primary ring-border",
  CONFIRMED: "bg-accent text-primary ring-border",
  CANCELLED: "bg-destructive/10 text-destructive ring-destructive/30",
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
