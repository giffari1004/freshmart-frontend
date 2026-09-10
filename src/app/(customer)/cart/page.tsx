"use client";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  CartHeader,
  CartList,
  CartSummary,
} from "@/features/cart/component";
import {
  CartError,
  CartLoading,
} from "@/features/cart/component/CartStates";
import { EmptyCart } from "@/features/cart/component/emptyCart";
import {
  useCart,
  useClearCart,
  useRemoveCart,
  useUpdateCart,
} from "@/features/cart/hooks";
import type { CartItem, CartResponse } from "@/features/cart/cartType";

type UpdateMutation = ReturnType<typeof useUpdateCart>;
type RemoveMutation = ReturnType<typeof useRemoveCart>;
type ClearMutation = ReturnType<typeof useClearCart>;

export default function CartPage() {
  const { data, isLoading, isError } = useCart();
  const update = useUpdateCart();
  const remove = useRemoveCart();
  const clearCart = useClearCart();

  if (isLoading) return <Page><CartLoading /></Page>;
  if (isError) return <Page><CartError /></Page>;
  if (!data?.items.length) return <Page><EmptyContent /></Page>;

  return (
    <Page>
      <CartContent
        data={data}
        update={update}
        remove={remove}
        clearCart={clearCart}
      />
    </Page>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-6 md:px-8">
      <CartHeader />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        {children}
      </div>
    </main>
  );
}

function EmptyContent() {
  return (
    <CartLayout>
      <div className="min-w-0">
        <EmptyCart />
      </div>

      <div className="w-full">
        <CartSummary
          totalItems={0}
          subtotal={0}
        />
      </div>
    </CartLayout>
  );
}

interface CartContentProps {
  data: CartResponse;
  update: UpdateMutation;
  remove: RemoveMutation;
  clearCart: ClearMutation;
}

function CartContent({
  data,
  update,
  remove,
  clearCart,
}: CartContentProps) {
  return (
    <CartLayout>
      <CartItems
        data={data}
        update={update}
        remove={remove}
      />

      <div className="w-full">
        <CartSummary
          totalItems={data.totalItems}
          subtotal={data.subtotal}
          onClear={() => clearCart.mutate()}
          isClearing={clearCart.isPending}
        />
      </div>
    </CartLayout>
  );
}

interface CartItemsProps {
  data: CartResponse;
  update: UpdateMutation;
  remove: RemoveMutation;
}

function CartItems({ data, update, remove }: CartItemsProps) {
  const busy = update.isPending || remove.isPending;

  const changeQuantity = (item: CartItem, quantity: number) => {
    if (busy || quantity < 1 || quantity === item.quantity) return;

    update.mutate({
      itemId: item.id,
      payload: { quantity },
    });
  };

  const removeItem = (item: CartItem) => {
    if (!busy) remove.mutate(item.id);
  };

  return (
    <div className="min-w-0">
      <CartList
        items={data.items}
        storeId={data.storeId}
        onChangeQuantity={changeQuantity}
        onRemove={removeItem}
      />
    </div>
  );
}