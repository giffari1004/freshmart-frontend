import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface Props { orderNumber: string; status: string; }

export function OrderDetailHeader({ orderNumber, status }: Props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/orders" className="rounded-xl border border-stone-200 bg-white p-2 text-stone-600 hover:text-stone-900"><ArrowLeft className="size-4" /></Link>
        <div><p className="text-sm text-stone-500">Order</p><h1 className="text-2xl font-bold text-stone-900">{orderNumber}</h1></div>
      </div>
      <OrderStatusBadge status={status} />
    </header>
  );
}
