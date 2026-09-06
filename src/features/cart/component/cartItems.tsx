"use client";

import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "../cartType";
import { QuantitySelector } from "./quantity-selector/quantitySelector";
import { useBogo } from "../hooks";

interface CartItemProps {
  item: CartItemType;
  storeId: string | null;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

interface CartItemActionsProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({
  item,
  storeId,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <article>
      <ProductImage item={item} />

      <ProductInfo
        item={item}
        storeId={storeId}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    </article>
  );
}

function ProductImage({ item }: { item: CartItemType }) {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-emerald-50 to-lime-50 ring-1 ring-stone-200 shadow-inner sm:size-28">
      <Image
        src={item.product.imageUrl || "/placeholder.png"}
        alt={item.product.name}
        fill
        sizes="(max-width: 640px) 96px, 112px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur">
        <ShoppingBag className="size-3.5 text-emerald-700" />
      </div>
    </div>
  );
}

function ProductInfo({
  item,
  storeId,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { data: bogo } = useBogo({
    storeId,
    productId: item.product.id,
    quantity: item.quantity,
  });

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black tracking-tight text-stone-950">
            {item.product.name}
          </h3>

          <p className="mt-1 text-sm text-stone-500">
            {formatPrice(item.unitPrice)} / item
          </p>

          {bogo?.eligible && (
            <p className="mt-2 text-sm font-semibold text-emerald-700">
              🎁 Buy 1 Get 1 · {bogo.freeQuantity} free
            </p>
          )}
        </div>
      </div>

      <CartItemActions
        item={item}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    </div>
  );
}

function CartItemActions({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemActionsProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <QuantitySelector
        quantity={item.quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-lg font-black tracking-tight text-stone-950">
          {formatPrice(item.subtotal)}
        </p>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label={`Remove ${item.product.name} from cart`}
          className="rounded-xl border border-stone-200/70 bg-white text-stone-400 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
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