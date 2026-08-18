import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderDetail } from "../order.type";
import { OrderDetailInformation } from "./OrderDetailInformation";
import { OrderDetailItems } from "./OrderDetailItems";
import { OrderDetailSummary } from "./OrderDetailSummary";
import { OrderCancelButton } from "./OrderCancelButton";
import { OrderConfirmButton } from "./OrderConfirmButton";
import { useConfirmOrder } from "../hooks/useConfirmOrder";

export function OrderDetailContent({ order }: { order: OrderDetail }) {
  const confirmOrder = useConfirmOrder();

  const handleConfirm = () => {
    confirmOrder.mutate(order.id);
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

function OrderDetailHeader({ order }: { order: OrderDetail }) {
  return (
    <header>
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-stone-500">
        <ArrowLeft className="size-4" /> Back to Orders
      </Link>
      <p className="mt-6 text-sm font-medium text-emerald-700">Order Detail</p>
      <h1 className="mt-1 text-3xl font-bold text-stone-900">{order.orderNumber}</h1>
      <p className="mt-2 text-sm text-stone-500">{new Date(order.createdAt).toLocaleString("id-ID")}</p>
    </header>
  );
}
