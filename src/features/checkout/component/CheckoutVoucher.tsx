interface CheckoutVoucherProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CheckoutVoucher({
  value,
  onChange,
  disabled = false,
}: CheckoutVoucherProps) {
  return (
    <section className="rounded-[1.65rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-emerald-200 sm:p-6">
      <h2 className="font-bold text-stone-900">Voucher</h2>
      <p className="mt-1 text-sm text-stone-500">
        Add an optional voucher before reviewing your order.
      </p>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="User voucher ID (optional)"
        disabled={disabled}
        className="mt-5 h-12 w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 text-sm outline-none transition placeholder:text-stone-400 hover:bg-white focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:bg-stone-100"
      />
    </section>
  );
}
