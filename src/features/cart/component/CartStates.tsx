import { Loader2, ShoppingCart } from "lucide-react";
import { CartSummary } from "./cartSummary";
import { EmptyCart } from "./emptyCart";
import { CartHeader } from "./CartHeader";

export function CartLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 md:px-8">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-5 py-4 text-sm font-medium text-muted-foreground shadow-sm">
          <Loader2 className="size-5 animate-spin text-primary" />
          Loading your cart...
        </div>
      </div>
    </main>
  );
}

export function CartError() {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 md:px-8">
        <div className="w-full rounded-xl border border-destructive/30 bg-background p-8 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <ShoppingCart className="size-6" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Unable to load your cart
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Please try again in a moment.
          </p>
        </div>
      </div>
    </main>
  );
}

export function CartEmpty() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
        <CartHeader />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 flex-1">
            <EmptyCart />
          </div>

          <div className="w-full lg:w-80">
            <CartSummary totalItems={0} subtotal={0} />
          </div>
        </div>
      </div>
    </main>
  );
}
