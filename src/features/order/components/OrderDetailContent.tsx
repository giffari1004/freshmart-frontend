import { OrderDetail } from "../order.type";
import { OrderDetailInformation } from "./OrderDetailInformation";
import { OrderDetailItems } from "./OrderDetailItems";
import { OrderDetailSummary } from "./OrderDetailSummary";
import { OrderCancelButton } from "./OrderCancelButton";
import { OrderConfirmButton } from "./OrderConfirmButton";
import { useConfirmOrder } from "../hooks/useConfirmOrder";
import { OrderDetailHeader } from "./OrderDetailHeader";

export function OrderDetailContent({ order }: { order: OrderDetail }) {
  const confirmOrder = useConfirmOrder();

  const handleConfirm = (onDone: () => void) => {
    confirmOrder.mutate(order.id, { onSuccess: onDone });
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <OrderDetailHeader order={order} />

        <OrderDetailInformation order={order} />

        <OrderDetailItems items={order.items} />

        <OrderDetailSummary order={order} />

        {order.status === "WAITING_PAYMENT" && (
          <OrderCancelButton orderId={order.id} />
        )}

        <OrderConfirmButton
          canConfirm={order.status === "SHIPPED"}
          isPending={confirmOrder.isPending}
          onConfirm={handleConfirm}
        />
      </div>
    </main>
  );
}