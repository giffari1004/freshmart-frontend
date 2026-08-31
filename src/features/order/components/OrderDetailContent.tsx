import { CheckCircle2 } from "lucide-react";
import { OrderDetail } from "../order.type";
import { OrderDetailInformation } from "./OrderDetailInformation";
import { OrderDetailItems } from "./OrderDetailItems";
import { OrderDetailSummary } from "./OrderDetailSummary";
import { OrderCancelButton } from "./OrderCancelButton";
import { OrderConfirmButton } from "./OrderConfirmButton";
import { useConfirmOrder } from "../hooks/useConfirmOrder";
import { OrderDetailHeader } from "./OrderDetailHeader";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

export function OrderDetailContent({
  order,
}: {
  order: OrderDetail;
}) {
  const confirmOrder = useConfirmOrder();

  const handleConfirm = (onDone: () => void) => {
    confirmOrder.mutate(order.id, { onSuccess: onDone });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50">
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:space-y-6 sm:py-8">
        <OrderDetailHeader order={order} />
        <OrderStatusTimeline status={order.status} />
        <OrderDetailInformation order={order} />
        <OrderDetailItems items={order.items} />
        <OrderDetailSummary order={order} />

        {order.status === "WAITING_PAYMENT" ? (
          <OrderCancelButton orderId={order.id} />
        ) : null}

        <OrderConfirmButton
          canConfirm={order.status === "SHIPPED"}
          isPending={confirmOrder.isPending}
          onConfirm={handleConfirm}
        />

        {order.status === "CONFIRMED" ? (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="size-4" />
            This order has been confirmed as received.
          </div>
        ) : null}
      </div>
    </main>
  );
}
