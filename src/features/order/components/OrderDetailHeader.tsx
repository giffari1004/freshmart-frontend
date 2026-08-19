import { OrderDetail } from "../order.type";

type Props = {
  order: OrderDetail;
};

export function OrderDetailHeader({ order }: Props) {
  return (
    <header>
      <h1 className="text-2xl font-bold text-stone-900">
        Order #{order.orderNumber}
      </h1>

      <p className="text-sm text-stone-500">
        Status: {order.status}
      </p>
    </header>
  );
}