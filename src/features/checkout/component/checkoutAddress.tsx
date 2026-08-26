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
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <SectionHeader />
      <div className="mt-5">
        <label
          htmlFor="addressId"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Delivery Address
        </label>

        {isLoading ? (
          <div className="h-11 w-full animate-pulse rounded-xl bg-stone-100" />
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load your addresses.
          </div>
        ) : addresses.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No delivery address is available for this account.
          </div>
        ) : (
          <select
            id="addressId"
            value={addressId}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-stone-100"
          >
            <option value="">Select a delivery address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.label} · {address.recipientName} · {address.city}
              </option>
            ))}
          </select>
        )}

        {addressId && (
          <SelectedAddress address={addresses.find((item) => item.id === addressId)} />
        )}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-emerald-50 p-2">
        <MapPin className="size-5 text-emerald-700" />
      </div>
      <div>
        <h2 className="font-semibold text-stone-900">Delivery Address</h2>
        <p className="text-sm text-stone-500">Select your delivery address</p>
      </div>
    </div>
  );
}

function SelectedAddress({ address }: { address?: CheckoutOptionAddress }) {
  if (!address) return null;

  return (
    <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
      <p className="font-medium text-stone-900">
        {address.recipientName} · {address.phone}
      </p>
      <p className="mt-1">
        {address.fullAddress}, {address.district}, {address.city},{" "}
        {address.province}
      </p>
    </div>
  );
}
