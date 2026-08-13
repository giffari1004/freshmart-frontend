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
  const {
    data,
    isLoading,
    isError,
  } = useCart();

  const updateCart = useUpdateCart();
  const removeCart = useRemoveCart();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-stone-50">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-stone-50 px-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Unable to load your cart
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Please try again in a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <EmptyCart />
        </div>
      </div>
    );
  }

  const isUpdating =
    updateCart.isPending ||
    removeCart.isPending;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList
            items={data.items}
            onIncrease={(item) => {
              if (isUpdating) return;

              updateCart.mutate({
                itemId: item.id,
                payload: {
                  quantity: item.quantity + 1,
                },
              });
            }}
            onDecrease={(item) => {
              if (
                isUpdating ||
                item.quantity <= 1
              ) {
                return;
              }

              updateCart.mutate({
                itemId: item.id,
                payload: {
                  quantity: item.quantity - 1,
                },
              });
            }}
            onRemove={(item) => {
              if (isUpdating) return;

              removeCart.mutate(item.id);
            }}
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