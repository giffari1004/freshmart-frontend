import { Truck } from "lucide-react";
import { CheckoutPreviewResponse } from "../checkout.type";
interface CheckoutShippingProps {
  shippingMethodId: string;
  preview?: CheckoutPreviewResponse;
  onChange: (value: string) => void;
  disabled?: boolean;
}
export function CheckoutShipping(props: CheckoutShippingProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <SectionHeader />
      <ShippingInput {...props} />
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
        <h2 className="font-semibold text-stone-900">Shipping Method</h2>
        <p className="text-sm text-stone-500">
          Select your preferred delivery method
        </p>
      </div>
    </div>
  );
}
function ShippingInput({
  shippingMethodId,
  preview,
  onChange,
  disabled,
}: CheckoutShippingProps) {
  return (
    <div className="mt-5">
      <label
        htmlFor="shippingMethodId"
        className="mb-2 block text-sm font-medium text-stone-700"
      >
        Shipping Method ID
      </label>
      <input
        id="shippingMethodId"
        value={shippingMethodId}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Masukkan shipping method ID"
        disabled={disabled}
        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-stone-100"
      />
      {preview?.shipping && <ShippingPreview shipping={preview.shipping} />}
    </div>
  );
}
function ShippingPreview({
  shipping,
}: {
  shipping: CheckoutPreviewResponse["shipping"];
}) {
  return (
    <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
      <div className="flex justify-between gap-4">
        <div>
          <p className="font-medium text-stone-900">{shipping.serviceName}</p>
          <p className="mt-1 text-xs text-stone-500">
            {shipping.courierCode} · {shipping.serviceCode}
          </p>
        </div>
        <p className="font-semibold text-stone-900">
          Rp {shipping.cost.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
