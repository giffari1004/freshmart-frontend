import { Building2, CalendarDays } from "lucide-react";
import { AdminOrderStatusSelect } from "./AdminOrderStatusSelect";
import {
  AdminOrder,
  AdminOrderActionStatus,
} from "./order-admin.type";

interface Props {
  orders: AdminOrder[];
  isPending: boolean;
  onStatusChange: (id: string, status: AdminOrderActionStatus) => void;
}

export function AdminOrdersTable({
  orders,
  isPending,
  onStatusChange,
}: Props) {
  if (isPending && !orders.length) {
    return (
      <div className="rounded-[1.75rem] border border-emerald-100 bg-white/95 p-8 text-sm font-semibold text-stone-600 shadow-sm">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-emerald-300 bg-white/95 p-10 text-center text-sm text-stone-500 shadow-[0_18px_40px_-30px_rgba(16,185,129,0.35)]">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white/95 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.3)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-stone-50 to-lime-50/70">
            <tr>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Order
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Store
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Status
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Total
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Created
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-stone-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-stone-100 transition-all duration-200 last:border-0 hover:bg-emerald-50/50"
              >
                <td className="px-5 py-5">
                  <p className="font-bold text-stone-900">{order.orderNumber}</p>
                </td>
                <td className="px-5 py-5">
                  <div className="flex gap-2.5">
                    <Building2 className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                    <div>
                      <p className="font-semibold text-stone-900">
                        {order.store?.name ?? "Store"}
                      </p>
                      <p className="mt-1 text-xs text-stone-400">
                        {order.store?.code ?? "-"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5">
                  <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-stone-700 shadow-sm">
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-5 font-bold text-stone-900">
                  Rp {order.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-5 text-stone-500">
                  <span className="inline-flex items-center gap-2 text-xs">
                    <CalendarDays className="size-3.5" />
                    {new Date(order.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </td>
                <td className="px-5 py-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminOrderStatusSelect
                      status={order.status}
                      isPending={isPending}
                      onChange={(status) => onStatusChange(order.id, status)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
