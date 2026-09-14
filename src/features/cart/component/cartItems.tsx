"use client";

import Image from "next/image";
import { Gift, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, CartPromotion } from "../cartType";
import { QuantitySelector } from "./quantity-selector/quantitySelector";

interface CartItemProps {
  item: CartItemType;
  onChangeQuantity: (quantity: number) => void;
  onRemove: () => void;
  promotion?: CartPromotion;
}

interface CartItemActionsProps {
  item: CartItemType;
  onChangeQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  item,
  onChangeQuantity,
  onRemove,
  promotion,
}: CartItemProps) {

  return (
    <article className="rounded-xl border border-border bg-background p-4 shadow-sm sm:p-5">
      <ProductImage item={item} />

      <ProductInfo
        item={item}
        promotion={promotion}
        onChangeQuantity={onChangeQuantity}
        onRemove={onRemove}
      />
    </article>
  );
}

function ProductImage({ item }: { item: CartItemType }) {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-accent ring-1 ring-border sm:size-28">
      <Image
        src={item.product.imageUrl || "/placeholder.png"}
        alt={item.product.name}
        fill
        sizes="(max-width: 640px) 96px, 112px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
        <ShoppingBag className="size-3.5 text-primary" />
      </div>
    </div>
  );
}

function ProductInfo({
  item,
  onChangeQuantity,
  onRemove,
  promotion,
}: CartItemProps) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight text-foreground">
            {item.product.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(item.unitPrice)} / item
          </p>
          {promotion && item.quantity === 1 ? (
            <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1.5 text-primary">
              <Gift className="size-3.5" />
              <span className="text-xs font-bold">BUY 1 GET 1</span>
              <span className="text-xs">· Gratis {promotion.freeQuantity} item</span>
            </div>
          ) : null}
        </div>
      </div>

      <CartItemActions
        item={item}
        onChangeQuantity={onChangeQuantity}
        onRemove={onRemove}
      />
    </div>
  );
}

function CartItemActions({
  item,
  onChangeQuantity,
  onRemove,
}: CartItemActionsProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <QuantitySelector
        quantity={item.quantity}
        onChange={onChangeQuantity}
      />

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-lg font-bold tracking-tight text-foreground">
          {formatPrice(item.subtotal)}
        </p>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label={`Remove ${item.product.name} from cart`}
          className="rounded-lg border border-border bg-background text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}