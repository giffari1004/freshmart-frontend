import { OrderListItem } from "../order.type";
import { OrderCard } from "./OrderCard";

interface OrderListProps { orders: OrderListItem[]; }

export function OrderList({ orders }: OrderListProps) {
  return <div className="space-y-4">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div>;
}
