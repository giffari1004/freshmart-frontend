import { CalendarDays, ClipboardList } from "lucide-react";
import { OrderDetail } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";

type Props = { order: OrderDetail };

export function OrderDetailHeader({ order }: Props) {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-border bg-white/95 shadow-sm">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-primary">
            <ClipboardList className="size-4" />
            Order Detail
          </div>
          <h1 className="mt-4 break-all text-2xl font-black tracking-tight text-foreground sm:text-4xl">
            #{order.orderNumber}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="size-4" />
            {new Date(order.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary to-accent" />
    </header>
  );
}
