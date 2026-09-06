interface CheckoutHeaderProps {
  title?: string;
  description?: string;
}

export function CheckoutHeader({
  title = "Complete your order",
  description = "Review your delivery details and order before continuing to payment.",
}: CheckoutHeaderProps) {
  return (
    <header className="relative mt-7 overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white via-white to-accent p-6 shadow-sm sm:p-8">
      <p className="inline-flex rounded-full border border-border bg-accent px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-primary">
        Checkout
      </p>
      <div className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
        <span className="rounded-full bg-primary px-3 py-1.5 text-white shadow-sm">01 Delivery</span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-full border border-border bg-white px-3 py-1.5 text-primary">02 Review</span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-full border border-border bg-white px-3 py-1.5 text-muted-foreground">03 Secure Pay</span>
      </div>
    </header>
  );
}
