import Link from "next/link";
import { OrderListItem } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderCardProps {
  order: OrderListItem;
  detailBasePath?: string;
}

export function OrderCard({ order, detailBasePath = "/orders" }: OrderCardProps) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-stone-900">{order.orderNumber}</p>
          <p className="mt-1 text-xs text-stone-500">
            {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
        <div>
          <p className="text-xs text-stone-500">Total</p>
          <p className="mt-1 font-bold text-stone-900">
            Rp {order.totalAmount.toLocaleString("id-ID")}
          </p>
        </div>

        <Link
          href={`${detailBasePath}/${order.id}`}
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          View Detail
        </Link>
      </div>
    </article>
  );
}
