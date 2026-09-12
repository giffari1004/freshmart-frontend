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
      <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm font-semibold text-stone-500">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-dashed border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50">
            <tr>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Order
              </th>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Store
              </th>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Total
              </th>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Created
              </th>
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-stone-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-stone-200 last:border-0 hover:bg-stone-50"
              >
                <td className="px-4 py-4">
                  <p className="font-medium text-stone-900">{order.orderNumber}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2.5">
                    <Building2 className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                    <div>
                      <p className="font-medium text-stone-900">
                        {order.store?.name ?? "Store"}
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        {order.store?.code ?? "-"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-stone-700">
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-stone-900">
                  Rp {order.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-4 text-stone-500">
                  <span className="inline-flex items-center gap-2 text-xs">
                    <CalendarDays className="size-3.5" />
                    {new Date(order.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </td>
                <td className="px-4 py-4">
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
