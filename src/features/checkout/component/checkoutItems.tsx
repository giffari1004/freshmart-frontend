import { ShoppingBag } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartResponse } from "@/features/cart/cartType";
import type { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutItemsProps {
  preview?: CheckoutPreviewResponse;
  cart?: CartResponse;
}

export function CheckoutItems({ preview, cart }: CheckoutItemsProps) {
  const items = preview?.items ?? cart?.items ?? [];
  return (
    <section>
      <CardHeader className="px-4 sm:px-5"><SectionHeader /></CardHeader>
      <CardContent className="px-4 sm:px-5">
        {items.length ? <ItemList items={items} preview={Boolean(preview)} /> : <EmptyItems />}
      </CardContent>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><ShoppingBag className="size-4" /></div>
      <div>
        <CardTitle className="text-base font-semibold">Your Items</CardTitle>
        <p className="text-xs text-muted-foreground">Review the products in your order.</p>
      </div>
    </div>
  );
}

function ItemList({ items, preview }: { items: Array<CheckoutPreviewResponse["items"][number] | CartResponse["items"][number]>; preview: boolean }) {
  return (
    <div className="divide-y divide-border">
      {items.map((item) => <ItemRow key={item.id} item={item} preview={preview} />)}
    </div>
  );
}

function ItemRow({ item, preview }: { item: CheckoutPreviewResponse["items"][number] | CartResponse["items"][number]; preview: boolean }) {
  const name = preview && "productName" in item ? item.productName : "product" in item ? item.product.name : "";
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{name}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}</p></div>
      <p className="shrink-0 text-sm font-semibold text-foreground">Rp {item.subtotal.toLocaleString("id-ID")}</p>
    </div>
  );
}

function EmptyItems() {
  return <div className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-3 text-sm text-muted-foreground">Your cart is empty.</div>;
}
