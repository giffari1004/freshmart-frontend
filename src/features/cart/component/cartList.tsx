"use client";

import { CartItem as CartItemType } from "../cartType";
import { CartItem } from "./cartItems";

interface CartListProps {
  items: CartItemType[];
  storeId: string | null;
  onIncrease: (item: CartItemType) => void;
  onDecrease: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
}

export function CartList({
  items,
  storeId,
  onIncrease,
  onDecrease,
  onRemove,
}: CartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          storeId={storeId}
          onIncrease={() => onIncrease(item)}
          onDecrease={() => onDecrease(item)}
          onRemove={() => onRemove(item)}
        />
      ))}
    </div>
  );
}