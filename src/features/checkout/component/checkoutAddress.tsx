import { MapPin } from "lucide-react";
import type { CheckoutOptionAddress } from "../checkout.type";

interface CheckoutAddressProps {
  addressId: string;
  addresses: CheckoutOptionAddress[];
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export function CheckoutAddress({
  addressId,
  addresses,
  onChange,
  disabled = false,
  isLoading = false,
  isError = false,
}: CheckoutAddressProps) {
  return (
    <section className="rounded-[1.65rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-emerald-200 sm:p-6">
      <SectionHeader />
      <div className="mt-6">
        <label
          htmlFor="addressId"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-500"
        >
          Delivery Address
        </label>

        {isLoading ? (
          <div className="h-12 w-full animate-pulse rounded-xl bg-stone-100" />
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            Unable to load your addresses.
          </div>
        ) : addresses.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
            No delivery address is available for this account.
          </div>
        ) : (
          <select
            id="addressId"
            value={addressId}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="h-12 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm font-medium text-stone-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:bg-stone-100"
          >
            <option value="">Select a delivery address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.label} · {address.recipientName} · {address.city}
              </option>
            ))}
          </select>
        )}

        {addressId ? (
          <SelectedAddress
            address={addresses.find((item) => item.id === addressId)}
          />
        ) : null}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
        <MapPin className="size-5" />
      </div>
      <div>
        <h2 className="font-bold text-stone-900">Delivery Address</h2>
        <p className="text-sm text-stone-500">Where should we deliver your order?</p>
      </div>
    </div>
  );
}

function SelectedAddress({
  address,
}: {
  address?: CheckoutOptionAddress;
}) {
  if (!address) return null;

  return (
    <div className="mt-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-4 text-sm text-stone-600 shadow-sm">
      <p className="font-semibold text-stone-900">
        {address.recipientName} · {address.phone}
      </p>
      <p className="mt-1 leading-6">
        {address.fullAddress}, {address.district}, {address.city},{" "}
        {address.province}
      </p>
    </div>
  );
}
