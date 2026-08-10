"use client";

import { Loader2 } from "lucide-react";

import {
  CartList,
  CartSummary,
  EmptyCart,
} from "@/features/cart/component";

import {
  useCart,
  useUpdateCart,
  useRemoveCart,
} from "@/features/cart/hooks";


export default function CartPage() {
  const { data, isLoading } = useCart();

  const updateCart = useUpdateCart();

  const removeCart = useRemoveCart();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <CartList
            items={data.items}
            onIncrease={(item) =>
              updateCart.mutate({
                itemId: item.id,
                payload: {
                  quantity: item.quantity + 1,
                },
              })
            }
            onDecrease={(item) =>
              updateCart.mutate({
                itemId: item.id,
                payload: {
                  quantity: item.quantity - 1,
                },
              })
            }
            onRemove={(item) =>
              removeCart.mutate(item.id)
            }
          />
        </div>

        <div>
          <CartSummary
            totalItems={data.totalItems}
            subtotal={data.subtotal}
          />
        </div>

      </div>
    </div>
  );
}