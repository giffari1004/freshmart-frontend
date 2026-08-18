import { PackageOpen } from "lucide-react";
import { OrderList } from "./OrderList";
import { OrderListItem } from "../order.type";

interface OrdersContentProps {
  orders: OrderListItem[];
  isPending: boolean;
  isError: boolean;
}

export function OrdersContent({ orders, isPending, isError }: OrdersContentProps) {
  if (isPending) return <p className="rounded-2xl bg-white p-6 text-stone-500">Loading orders...</p>;
  if (isError) return <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">Unable to load orders.</p>;
  if (!orders.length) return <EmptyOrders />;
  return <OrderList orders={orders} />;
}

function EmptyOrders() {
  return (
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
      <PackageOpen className="mx-auto size-10 text-stone-400" />
      <p className="mt-3 font-semibold text-stone-900">No orders yet</p>
      <p className="mt-1 text-sm text-stone-500">Your completed checkout orders will appear here.</p>
    </div>
  );
}
