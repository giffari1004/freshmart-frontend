interface CheckoutHeaderProps {
  title?: string;
  description?: string;
}

export function CheckoutHeader({
  title = "Complete your order",
  description = "Review your delivery details and order before continuing to payment.",
}: CheckoutHeaderProps) {
  return (
    <header className="relative mt-7 overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-gradient-to-br from-white via-white to-emerald-50/80 p-6 shadow-[0_18px_45px_-28px_rgba(16,185,129,0.4)] sm:p-8">
      <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
        Checkout
      </p>
      <div className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
          {description}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-stone-600">
        <span className="rounded-full bg-emerald-700 px-3 py-1.5 text-white shadow-sm">01 Delivery</span>
        <span className="text-stone-300">→</span>
        <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-emerald-800">02 Review</span>
        <span className="text-stone-300">→</span>
        <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-500">03 Secure Pay</span>
      </div>
    </header>
  );
}
