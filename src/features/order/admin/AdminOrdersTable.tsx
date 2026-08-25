import { AdminOrderStatusSelect } from "./AdminOrderStatusSelect";
import { AdminOrder, AdminOrderActionStatus } from "./order-admin.type";

interface Props {
  orders: AdminOrder[];
  isPending: boolean;
  onStatusChange: (id: string, status: AdminOrderActionStatus) => void;
  onCancel: (id: string) => void;
}

export function AdminOrdersTable({
  orders,
  isPending,
  onStatusChange,
  onCancel,
}: Props) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-sm text-stone-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50">
          <tr>
            <th className="px-5 py-4 font-semibold">Order</th>
            <th className="px-5 py-4 font-semibold">Store</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Total</th>
            <th className="px-5 py-4 font-semibold">Created</th>
            <th className="px-5 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-stone-100 last:border-0"
            >
              <td className="px-5 py-4 font-medium">{order.orderNumber}</td>
              <td className="px-5 py-4">
                <p>{order.store.name}</p>
                <p className="text-xs text-stone-400">{order.store.code}</p>
              </td>
              <td className="px-5 py-4">
                {order.status.replaceAll("_", " ")}
              </td>
              <td className="px-5 py-4">
                Rp {order.totalAmount.toLocaleString("id-ID")}
              </td>
              <td className="px-5 py-4 text-stone-500">
                {new Date(order.createdAt).toLocaleDateString("id-ID")}
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <AdminOrderStatusSelect
                    status={order.status}
                    isPending={isPending}
                    onChange={(status) => onStatusChange(order.id, status)}
                  />
                  {(order.status === "PAID" || order.status === "PROCESSED") && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => onCancel(order.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
