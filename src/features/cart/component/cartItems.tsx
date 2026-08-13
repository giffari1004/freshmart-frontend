"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CartItem as CartItemType } from "../cartType";
import { QuantitySelector } from "./quantity-selector/quantitySelector";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100">
          <Image
            src={
              item.product.imageUrl ||
              "/placeholder.png"
            }
            alt={item.product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <div>
            <h3 className="truncate text-base font-semibold text-stone-900">
              {item.product.name}
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              {formatPrice(item.unitPrice)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />

            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-stone-900">
                {formatPrice(item.subtotal)}
              </p>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                aria-label={`Remove ${item.product.name} from cart`}
                className="rounded-xl text-stone-400 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}