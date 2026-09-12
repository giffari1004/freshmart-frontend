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
import { OrderPayAgainButton } from "./OrderPayAgainButton";

export function OrderDetailContent({ order }: { order: OrderDetail }) {
  const confirmOrder = useConfirmOrder();
  const handleConfirm = (onDone: () => void) => confirmOrder.mutate(order.id, { onSuccess: onDone });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:space-y-5 sm:py-8">
        <OrderDetailHeader order={order} />
        <OrderStatusTimeline status={order.status} />
        <OrderDetailInformation order={order} />
        <OrderDetailItems items={order.items} />
        <OrderDetailSummary order={order} />
        <OrderActions order={order} isPending={confirmOrder.isPending} onConfirm={handleConfirm} />
      </div>
    </main>
  );
}

function OrderActions({
  order,
  isPending,
  onConfirm,
}: {
  order: OrderDetail;
  isPending: boolean;
  onConfirm: (onDone: () => void) => void;
}) {
  return (
    <>
      {order.status === "WAITING_PAYMENT" ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <OrderPayAgainButton orderId={order.id} />
          <OrderCancelButton orderId={order.id} />
        </div>
      ) : null}
      <OrderConfirmButton canConfirm={order.status === "SHIPPED"} isPending={isPending} onConfirm={onConfirm} />
      {order.status === "CONFIRMED" ? <ConfirmedNotice /> : null}
    </>
  );
}

function ConfirmedNotice() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-accent p-3 text-sm font-medium text-primary">
      <CheckCircle2 className="size-4" />
      This order has been confirmed as received.
    </div>
  );
}
