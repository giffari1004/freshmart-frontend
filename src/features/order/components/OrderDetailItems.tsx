import { Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderDetailItem } from "../order.type";

export function OrderDetailItems({ items }: { items: OrderDetailItem[] }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 pb-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
          <Package className="size-4" />
        </div>
        <div>
          <h2 className="font-semibold">Order Items</h2>
          <p className="text-xs text-muted-foreground">Products included in this order.</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y divide-border">
          {items.map((item, index) => (
            <div key={`${item.productId}-${index}`} className="flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.productName}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}</p>
              </div>
              <p className="text-sm font-semibold">Rp {item.subtotal.toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
