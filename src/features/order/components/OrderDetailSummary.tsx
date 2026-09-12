import { ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderDetail } from "../order.type";

export function OrderDetailSummary({ order }: { order: OrderDetail }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 pb-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
          <ReceiptText className="size-4" />
        </div>
        <div>
          <h2 className="font-semibold">Order Summary</h2>
          <p className="text-xs text-muted-foreground">Final order calculation.</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0 text-sm">
        <SummaryRow label="Subtotal" value={order.subtotal} />
        <SummaryRow label="Discount" value={-order.discountAmount} />
        <SummaryRow label="Shipping" value={order.shippingCost} />
        <div className="border-t border-border pt-3">
          <SummaryRow label="Total" value={order.totalAmount} strong />
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "text-xl font-bold" : "font-semibold"}>Rp {value.toLocaleString("id-ID")}</span>
    </div>
  );
}
