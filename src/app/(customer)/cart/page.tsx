"use client";
import { Loader2 } from "lucide-react";
import { CartList, CartSummary, EmptyCart } from "@/features/cart/component";
import { useCart, useUpdateCart, useRemoveCart, useAddToCart } from "@/features/cart/hooks";
import { CartResponse, CartItem } from "@/features/cart/cartType";

type UpdateMutation = ReturnType<typeof useUpdateCart>;
type RemoveMutation = ReturnType<typeof useRemoveCart>;

export default function CartPage() {
  const { data, isLoading, isError } = useCart();
  const update = useUpdateCart(), remove = useRemoveCart();
  if (isLoading) return <CartLoading />;
  if (isError) return <CartError />;
  if (!data?.items.length) return <CartEmpty />;
  return <CartContent data={data} update={update} remove={remove} />;
}
function CartLoading() { return <div className="flex min-h-[60vh] items-center justify-center bg-stone-50"><Loader2 className="size-8 animate-spin text-emerald-600" /></div>; }
function CartError() { return <div className="flex min-h-[60vh] items-center justify-center bg-stone-50 px-4"><div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm"><h2 className="text-lg font-semibold text-stone-900">Unable to load your cart</h2><p className="mt-2 text-sm text-stone-500">Please try again in a moment.</p></div></div>; }
function CartEmpty() { return <div className="min-h-[60vh] bg-stone-50"><div className="mx-auto max-w-7xl px-4 py-10"><EmptyCart /></div></div>; }
interface CartContentProps { data: CartResponse; update: UpdateMutation; remove: RemoveMutation; }
function CartContent({ data, update, remove }: CartContentProps) {
  const busy = update.isPending || remove.isPending;
  const increase = (item: CartItem) => { if (!busy) update.mutate({ itemId: item.id, payload: { quantity: item.quantity + 1 } }); };
  const decrease = (item: CartItem) => { if (!busy && item.quantity > 1) update.mutate({ itemId: item.id, payload: { quantity: item.quantity - 1 } }); };
  const clear = (item: CartItem) => { if (!busy) remove.mutate(item.id); };
  return <div className="min-h-screen bg-stone-50"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-3"><div className="lg:col-span-2"><CartList items={data.items} onIncrease={increase} onDecrease={decrease} onRemove={clear} /></div><CartSummary totalItems={data.totalItems} subtotal={data.subtotal} /></div></div>;
}
