interface CheckoutHeaderProps {
  title?: string;
  description?: string;
}
export function CheckoutHeader({
  title = "Complete your order",
  description = "Review your delivery details and order before continuing to payment.",
}: CheckoutHeaderProps) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium text-emerald-700">Checkout</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-stone-500">{description}</p>
    </div>
  );
}
