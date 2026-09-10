import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { OrderListItem } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderPayAgainButton } from "./OrderPayAgainButton";

interface OrderCardProps {
  order: OrderListItem;
  detailBasePath?: string;
}

export function OrderCard({
  order,
  detailBasePath = "/orders",
}: OrderCardProps) {
  return (
    <article className="group rounded-xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Order
          </p>
          <p className="mt-1 truncate text-lg font-semibold tracking-tight text-foreground">
            {order.orderNumber}
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Rp {order.totalAmount.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {order.status === "WAITING_PAYMENT" ? (
            <OrderPayAgainButton orderId={order.id} />
          ) : null}

          <Link
            href={`${detailBasePath}/${order.id}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/80"
          >
            View Detail
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
