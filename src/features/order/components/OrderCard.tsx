import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderListItem } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderPayAgainButton } from "./OrderPayAgainButton";

interface OrderCardProps {
  order: OrderListItem;
  detailBasePath?: string;
}

export function OrderCard({
  order,
  detailBasePath = "/orders",
}: OrderCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Order
          </p>
          <p className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg">
            {order.orderNumber}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>

      <CardContent className="border-t border-border pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              Rp {order.totalAmount.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {order.status === "WAITING_PAYMENT" ? (
              <OrderPayAgainButton orderId={order.id} />
            ) : null}
            <Button asChild className="h-11 gap-2 rounded-lg px-5 text-sm font-semibold">
              <Link href={`${detailBasePath}/${order.id}`}>
                View Detail
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
