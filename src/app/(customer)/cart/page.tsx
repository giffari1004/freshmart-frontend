"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { CartList, CartSummary, EmptyCart } from "@/features/cart/component";
import { useCart, useUpdateCart, useRemoveCart } from "@/features/cart/hooks";
import { CartResponse, CartItem } from "@/features/cart/cartType";

type UpdateMutation = ReturnType<typeof useUpdateCart>;
type RemoveMutation = ReturnType<typeof useRemoveCart>;

export default function CartPage() {
  const { data, isLoading, isError } = useCart();
  const update = useUpdateCart();
  const remove = useRemoveCart();

  if (isLoading) return <CartLoading />;
  if (isError) return <CartError />;
  if (!data?.items.length) return <CartEmpty />;

  return <CartContent data={data} update={update} remove={remove} />;
}

function CartLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.12),_transparent_28%),linear-gradient(to_bottom,_#f7fee7_0%,_#fafaf9_38%,_#fafaf9_100%)]">
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-sm font-medium text-stone-600 shadow-sm">
          <Loader2 className="size-5 animate-spin text-emerald-600" />
          Loading your cart...
        </div>
      </div>
    </main>
  );
}

function CartError() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50/50 via-stone-50 to-stone-50 px-4 py-10">
      <div className="mx-auto flex min-h-[50vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <ShoppingCart className="size-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-stone-900">
            Unable to load your cart
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            Please try again in a moment.
          </p>
        </div>
      </div>
    </main>
  );
}

function CartEmpty() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.12),_transparent_28%),linear-gradient(to_bottom,_#f7fee7_0%,_#fafaf9_38%,_#fafaf9_100%)]">
  <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
    <div className="mb-8 text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur">
        FreshMart
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
        Shopping Cart
      </h1>

      <p className="mt-2 text-sm text-stone-500">
        Review your items before checkout.
      </p>
    </div>

    <EmptyCart />
  </div>
</main>
  );
}

interface CartContentProps {
  data: CartResponse;
  update: UpdateMutation;
  remove: RemoveMutation;
}

function CartContent({ data, update, remove }: CartContentProps) {
  const busy = update.isPending || remove.isPending;

  const increase = (item: CartItem) => {
    if (!busy) {
      update.mutate({
        itemId: item.id,
        payload: { quantity: item.quantity + 1 },
      });
    }
  };

  const decrease = (item: CartItem) => {
    if (!busy && item.quantity > 1) {
      update.mutate({
        itemId: item.id,
        payload: { quantity: item.quantity - 1 },
      });
    }
  };

  const clear = (item: CartItem) => {
    if (!busy) {
      remove.mutate(item.id);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.12),_transparent_28%),linear-gradient(to_bottom,_#f7fee7_0%,_#fafaf9_38%,_#fafaf9_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <header className="mb-8 grid gap-5 overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white/90 p-6 shadow-[0_18px_45px_-28px_rgba(16,185,129,0.38)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              FreshMart
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">
              Shopping Cart
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              Review quantities and make sure everything you need is ready for
              checkout.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 px-4 py-3 text-sm shadow-sm">
            <p className="font-black text-stone-900">
              Fresh picks, one checkout.
            </p>
            <p className="mt-1 text-xs leading-5 text-stone-500">
              Adjust quantities, then continue when everything looks right.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 flex-1">
            <CartList
              items={data.items}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={clear}
            />
          </div>

          <div className="w-full lg:w-80">
            <CartSummary
              totalItems={data.totalItems}
              subtotal={data.subtotal}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
