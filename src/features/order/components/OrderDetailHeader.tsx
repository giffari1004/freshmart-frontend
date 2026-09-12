import { CalendarDays, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OrderDetail } from "../order.type";
import { OrderStatusBadge } from "./OrderStatusBadge";

type Props = { order: OrderDetail };

export function OrderDetailHeader({ order }: Props) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <ClipboardList className="size-4" />
            Order Detail
          </div>
          <h1 className="mt-2 break-all text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            #{order.orderNumber}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {new Date(order.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardContent>
    </Card>
  );
}
