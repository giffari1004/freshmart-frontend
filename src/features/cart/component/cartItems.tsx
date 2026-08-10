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

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-stone-100">
        <Image
          src={item.product.imageUrl || "/placeholder.png"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold">{item.product.name}</h3>

          <p className="mt-1 text-sm text-stone-500">
            Rp {item.unitPrice.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

          <div className="text-right">
            <p className="text-sm font-semibold">
              Rp {item.subtotal.toLocaleString("id-ID")}
            </p>

            <Button variant="ghost" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
