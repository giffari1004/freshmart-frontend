import { CalendarDays, ClipboardList } from "lucide-react";
import { OrderDetail } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";

type Props = { order: OrderDetail };

export function OrderDetailHeader({ order }: Props) {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white/95 shadow-[0_20px_45px_-28px_rgba(16,185,129,0.42)]">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
            <ClipboardList className="size-4" />
            Order Detail
          </div>
          <h1 className="mt-4 break-all text-2xl font-black tracking-tight text-stone-950 sm:text-4xl">
            #{order.orderNumber}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-stone-500">
            <CalendarDays className="size-4" />
            {new Date(order.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-lime-300" />
    </header>
  );
}
