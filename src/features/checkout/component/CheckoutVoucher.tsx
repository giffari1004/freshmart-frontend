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
    <section className="rounded-[1.65rem] border border-border bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-border sm:p-6">
      <h2 className="font-bold text-foreground">Voucher</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Add an optional voucher before reviewing your order.
      </p>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="User voucher ID (optional)"
        disabled={disabled}
        className="mt-5 h-12 w-full rounded-xl border border-border bg-background/60 px-4 text-sm outline-none transition placeholder:text-muted-foreground hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-ring/20 disabled:bg-muted"
      />
    </section>
  );
}
