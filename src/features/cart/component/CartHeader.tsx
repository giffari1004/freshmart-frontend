export function CartHeader() {
  return (
    <header className="grid gap-5 rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          FreshMart
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Review quantities and make sure everything you need is ready for
          checkout.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-accent px-4 py-3 text-sm">
        <p className="font-semibold text-foreground">
          Fresh picks, one checkout.
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Your cart is ready whenever you are.
        </p>
      </div>
    </header>
  );
}
