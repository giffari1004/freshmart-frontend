import { Truck } from "lucide-react";
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
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <SectionHeader />

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <>
            <div className="h-20 animate-pulse rounded-2xl bg-stone-100" />
            <div className="h-20 animate-pulse rounded-2xl bg-stone-100" />
          </>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load shipping methods for the selected address.
          </div>
        ) : shippingMethods.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No shipping methods are available for this checkout.
          </div>
        ) : (
          shippingMethods.map((method) => {
            const selected =
              method.id === shippingMethodId;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onChange(method.id)}
                disabled={disabled}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-stone-200 bg-white hover:border-emerald-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-stone-900">
                      {method.serviceName}
                    </p>

                    <p className="mt-1 text-xs text-stone-500">
                      {method.courierCode} ·{" "}
                      {method.serviceCode}
                    </p>

                    {method.etd && (
                      <p className="mt-2 text-xs text-stone-500">
                        ETA: {method.etd}
                      </p>
                    )}
                  </div>

                  <p className="font-semibold text-stone-900">
                    Rp{" "}
                    {Number(method.cost).toLocaleString(
                      "id-ID",
                    )}
                  </p>
                </div>
              </button>
            );
          })
        )}

        {preview?.shipping && (
          <div className="rounded-2xl bg-stone-50 p-4 text-xs text-stone-500">
            Selected shipping is ready for checkout
            preview.
          </div>
        )}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-emerald-50 p-2">
        <Truck className="size-5 text-emerald-700" />
      </div>

      <div>
        <h2 className="font-semibold text-stone-900">
          Shipping Method
        </h2>

        <p className="text-sm text-stone-500">
          Select your preferred delivery method
        </p>
      </div>
    </div>
  );
}