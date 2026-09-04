import { ShoppingBag } from "lucide-react";
import { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutItemsProps {
  preview?: CheckoutPreviewResponse;
}

export function CheckoutItems({ preview }: CheckoutItemsProps) {
  return (
    <section className="rounded-[1.65rem] border border-border bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-border sm:p-6">
      <SectionHeader />
      {preview?.items?.length ? (
        <div className="mt-6 space-y-3">
          {preview.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyItems />
      )}
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
        <ShoppingBag className="size-5" />
      </div>
      <div>
        <h2 className="font-bold text-foreground">Your Items</h2>
        <p className="text-sm text-muted-foreground">
          Review the products in your order.
        </p>
      </div>
    </div>
  );
}

function ItemRow({
  item,
}: {
  item: CheckoutPreviewResponse["items"][number];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-gradient-to-r from-background to-white p-4 shadow-sm transition hover:border-border hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">
          {item.productName}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}
        </p>
      </div>
      <p className="font-bold text-foreground">
        Rp {item.subtotal.toLocaleString("id-ID")}
      </p>
    </div>
  );
}

function EmptyItems() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border bg-background p-5">
      <p className="text-sm leading-6 text-muted-foreground">
        Cart data will appear after checkout preview.
      </p>
    </div>
  );
}
