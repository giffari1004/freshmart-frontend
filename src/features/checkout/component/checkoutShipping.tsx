import { Check, Truck } from "lucide-react";
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
  return (
    <section className="rounded-[1.65rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-emerald-200 sm:p-6">
      <SectionHeader />

      <div className="mt-6 space-y-3">
        {isLoading ? (
          <>
            <div className="h-24 animate-pulse rounded-2xl bg-stone-100" />
            <div className="h-24 animate-pulse rounded-2xl bg-stone-100" />
          </>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            Unable to load shipping methods for the selected address.
          </div>
        ) : shippingMethods.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
            No shipping methods are available for this checkout.
          </div>
        ) : (
          shippingMethods.map((method) => {
            const selected = method.id === shippingMethodId;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onChange(method.id)}
                disabled={disabled}
                className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                  selected
                    ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-lime-50 shadow-md ring-2 ring-emerald-100"
                    : "border-stone-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900">
                      {method.serviceName}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {method.courierCode} · {method.serviceCode}
                    </p>
                    {method.etd ? (
                      <p className="mt-2 text-xs font-medium text-stone-500">
                        ETA: {method.etd}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="font-bold text-stone-900">
                      Rp {Number(method.cost).toLocaleString("id-ID")}
                    </p>
                    {selected ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-black text-white shadow-sm">
                        <Check className="size-3" />
                        Selected
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })
        )}

        {preview?.shipping ? (
          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4 text-xs leading-5 text-stone-500">
            Selected shipping is ready for checkout preview.
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
        <Truck className="size-5" />
      </div>
      <div>
        <h2 className="font-bold text-stone-900">Shipping Method</h2>
        <p className="text-sm text-stone-500">
          Choose your preferred delivery option.
        </p>
      </div>
    </div>
  );
}
