import { ShoppingBag } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartResponse } from "@/features/cart/cartType";
import type { CheckoutPreviewResponse } from "../checkout.type";

type CheckoutItem = CheckoutPreviewResponse["items"][number];
type CartItem = CartResponse["items"][number];
type Automatic = CheckoutPreviewResponse["discount"]["automatic"];

interface CheckoutItemsProps {
  preview?: CheckoutPreviewResponse;
  cart?: CartResponse;
}

export function CheckoutItems({ preview, cart }: CheckoutItemsProps) {
  const items = preview?.items ?? cart?.items ?? [];
  const automatic = preview?.discount.automatic ?? [];
  return (
    <section>
      <CardHeader className="px-4 sm:px-5"><SectionHeader /></CardHeader>
      <CardContent className="px-4 sm:px-5">
        {items.length ? (
          <ItemList items={items} preview={Boolean(preview)} automatic={automatic} />
        ) : <EmptyItems />}
      </CardContent>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
        <ShoppingBag className="size-4" />
      </div>
      <div>
        <CardTitle className="text-base font-semibold">Your Items</CardTitle>
        <p className="text-xs text-muted-foreground">Review the products in your order.</p>
      </div>
    </div>
  );
}

function ItemList({
  items,
  preview,
  automatic,
}: {
  items: Array<CheckoutItem | CartItem>;
  preview: boolean;
  automatic: Automatic;
}) {
  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} preview={preview} automatic={automatic} />
      ))}
    </div>
  );
}

function ItemRow({ item, preview, automatic }: { item: CheckoutItem | CartItem; preview: boolean; automatic: Automatic }) {
  const name = getItemName(item, preview);
  const freeQuantity = getFreeQuantity(item, automatic, preview);
  const detail = getItemDetail(item, freeQuantity);
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{name}</p><p className="mt-0.5 text-xs text-muted-foreground">{detail}</p></div>
      <p className="shrink-0 text-sm font-semibold text-foreground">Rp {item.subtotal.toLocaleString("id-ID")}</p>
    </div>
  );
}

function getItemDetail(item: CheckoutItem | CartItem, freeQuantity: number) {
  if (!freeQuantity) return `${item.quantity} × Rp ${item.unitPrice.toLocaleString("id-ID")}`;
  return `${item.quantity - freeQuantity} paid + ${freeQuantity} free = ${item.quantity} units`;
}

function getItemName(item: CheckoutItem | CartItem, preview: boolean) {
  if (preview && "productName" in item) return item.productName;
  if ("product" in item) return item.product.name;
  return "";
}

function getFreeQuantity(item: CheckoutItem | CartItem, automatic: Automatic, preview: boolean) {
  if (!preview || !("productId" in item)) return 0;
  return automatic.find(
    (discount) => discount.type === "BUY1GET1" && discount.productId === item.productId,
  )?.freeQuantity ?? 0;
}

function EmptyItems() {
  return <div className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-3 text-sm text-muted-foreground">Your cart is empty.</div>;
}
