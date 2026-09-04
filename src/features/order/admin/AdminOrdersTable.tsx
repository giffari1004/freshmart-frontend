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
      <div className="rounded-[1.75rem] border border-border bg-white/95 p-8 text-sm font-semibold text-muted-foreground shadow-sm">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border bg-white/95 p-10 text-center text-sm text-muted-foreground shadow-sm">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white/95 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.3)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-gradient-to-r from-accent/80 via-background to-accent/70">
            <tr>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Order
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Store
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Total
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Created
              </th>
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border transition-all duration-200 last:border-0 hover:bg-accent"
              >
                <td className="px-5 py-5">
                  <p className="font-bold text-foreground">{order.orderNumber}</p>
                </td>
                <td className="px-5 py-5">
                  <div className="flex gap-2.5">
                    <Building2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {order.store?.name ?? "Store"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.store?.code ?? "-"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5">
                  <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-foreground shadow-sm">
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-5 font-bold text-foreground">
                  Rp {order.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-5 text-muted-foreground">
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
