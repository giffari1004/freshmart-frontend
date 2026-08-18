import { AdminOrderStatusSelect } from "./AdminOrderStatusSelect";
import { AdminOrder, AdminOrderStatus } from "./order-admin.type";

interface Props {
  orders: AdminOrder[];
  isPending: boolean;
  onStatusChange: (id: string, status: AdminOrderStatus) => void;
}

export function AdminOrdersTable({ orders, isPending, onStatusChange }: Props) {
  if (!orders.length) {
    return <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-sm text-stone-500">No orders found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50">
          <tr>
            <th className="px-5 py-4 font-semibold">Order</th>
            <th className="px-5 py-4 font-semibold">Store</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Total</th>
            <th className="px-5 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-stone-100 last:border-0">
              <td className="px-5 py-4 font-medium">{order.orderNumber}</td>
              <td className="px-5 py-4">{order.store.name}</td>
              <td className="px-5 py-4">{order.status}</td>
              <td className="px-5 py-4">Rp {order.totalAmount.toLocaleString("id-ID")}</td>
              <td className="px-5 py-4">
                <AdminOrderStatusSelect
                  status={order.status}
                  isPending={isPending}
                  onChange={(status) => onStatusChange(order.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
