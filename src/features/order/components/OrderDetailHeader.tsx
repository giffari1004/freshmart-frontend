import { CalendarDays } from "lucide-react";
import { OrderDetail } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";

type Props = { order: OrderDetail };

export function OrderDetailHeader({ order }: Props) {
  return (
    <header className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">Order Detail</p>
          <h1 className="mt-1 text-2xl font-bold text-stone-900">
            #{order.orderNumber}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
            <CalendarDays className="size-4" />
            {new Date(order.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
    </header>
  );
}
