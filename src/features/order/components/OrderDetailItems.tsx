import { Package } from "lucide-react";
import { OrderDetailItem } from "../order.type";

interface Props {
  items: OrderDetailItem[];
}

export function OrderDetailItems({ items }: Props) {
  return (
    <section className="rounded-xl border border-border bg-background p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary shadow-sm">
          <Package className="size-5" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Order Items</h2>
          <p className="text-sm text-muted-foreground">Products included in this order.</p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-border">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="flex flex-col gap-3 rounded-xl px-3 py-4 first:pt-0 even:bg-background/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">
                {item.productName}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}
              </p>
            </div>
            <p className="font-semibold text-foreground">
              Rp {item.subtotal.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
