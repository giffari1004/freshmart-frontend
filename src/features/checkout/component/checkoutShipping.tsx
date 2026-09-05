import { Truck } from "lucide-react";
import type { ReactNode } from "react";
import type {
  CheckoutOptionShipping,
  CheckoutPreviewResponse,
} from "../checkout.type";

interface CheckoutShippingProps {
  shippingMethodId: string;
  shippingMethods: CheckoutOptionShipping[];
  preview?: CheckoutPreviewResponse;
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export function CheckoutShipping({
  shippingMethodId,
  shippingMethods,
  preview,
  onChange,
  disabled = false,
  isLoading = false,
  isError = false,
}: CheckoutShippingProps) {
  const selectedMethod = shippingMethods.find(
    (method) => method.id === shippingMethodId,
  );

  return (
    <section className="rounded-[1.65rem] border border-border bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-border sm:p-6">
      <SectionHeader />
      <div className="mt-6 space-y-3">
        {isLoading ? (
          <div className="h-14 animate-pulse rounded-2xl bg-muted" />
        ) : isError ? (
          <MessageBox type="error">
            Unable to load shipping methods for the selected address.
          </MessageBox>
        ) : shippingMethods.length === 0 ? (
          <MessageBox type="warning">
            No shipping methods are available for this checkout.
          </MessageBox>
        ) : (
          <ShippingSelect
            value={shippingMethodId}
            methods={shippingMethods}
            disabled={disabled}
            onChange={onChange}
          />
        )}

        {selectedMethod?.etd ? (
          <p className="px-1 text-xs font-medium text-muted-foreground">
            Estimated delivery: {selectedMethod.etd}
          </p>
        ) : null}

        {preview?.shipping ? (
          <div className="rounded-2xl border border-border bg-background p-4 text-xs leading-5 text-muted-foreground">
            Selected shipping is ready for checkout preview.
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ShippingSelect({
  value,
  methods,
  disabled,
  onChange,
}: {
  value: string;
  methods: CheckoutOptionShipping[];
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-label="Shipping method"
        className="w-full appearance-none rounded-2xl border border-border bg-white px-4 py-4 pr-12 text-sm font-semibold text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60"
      >
        <option value="" disabled>
          Select a shipping method
        </option>
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.serviceName} · Rp {Number(method.cost).toLocaleString("id-ID")}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
        ▼
      </span>
    </div>
  );
}

function MessageBox({
  type,
  children,
}: {
  type: "error" | "warning";
  children: ReactNode;
}) {
  const styles =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${styles}`}>
      {children}
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent text-primary shadow-sm">
        <Truck className="size-5" />
      </div>
      <div>
        <h2 className="font-bold text-foreground">Shipping Method</h2>
        <p className="text-sm text-muted-foreground">
          Choose your preferred delivery option.
        </p>
      </div>
    </div>
  );
}
