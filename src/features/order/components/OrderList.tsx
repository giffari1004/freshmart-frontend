import { OrderListItem } from "../order.type";
import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: OrderListItem[];
  detailBasePath?: string;
}

export function OrderList({
  orders,
  detailBasePath = "/orders",
}: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          detailBasePath={detailBasePath}
        />
      ))}
    </div>
  );
}
