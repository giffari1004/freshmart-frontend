"use client";

import { CartItem as CartItemType } from "../cartType";
import { CartItem } from "./cartItems";

interface CartListProps {
  items: CartItemType[];
  storeId: string | null;
  onChangeQuantity: (item: CartItemType, quantity: number) => void;
  onRemove: (item: CartItemType) => void;
}

export function CartList({
  items,
  storeId,
  onChangeQuantity,
  onRemove,
}: CartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          storeId={storeId}
          onChangeQuantity={(quantity) => onChangeQuantity(item, quantity)}
          onRemove={() => onRemove(item)}
        />
      ))}
    </div>
  );
}