"use client";

import { CartItem as CartItemType, CartPromotion } from "../cartType";
import { useCartPromotions } from "../hooks";
import { CartItem } from "./cartItems";

interface CartListProps {
  items: CartItemType[];
  onChangeQuantity: (item: CartItemType, quantity: number) => void;
  onRemove: (item: CartItemType) => void;
}

export function CartList({
  items,
  onChangeQuantity,
  onRemove,
}: CartListProps) {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
  const { data } = useCartPromotions(totalItems, subtotal, totalItems > 0);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          promotion={findBogo(data?.promotions ?? [], item.product.id)}
          onChangeQuantity={(quantity) => onChangeQuantity(item, quantity)}
          onRemove={() => onRemove(item)}
        />
      ))}
    </div>
  );
}

function findBogo(promotions: CartPromotion[], productId: string) {
  return promotions.find(
    (promotion) =>
      promotion.type === "BUY1GET1" && promotion.productId === productId,
  );
}
