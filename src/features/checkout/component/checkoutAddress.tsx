import { MapPin } from "lucide-react";
interface CheckoutAddressProps {
  addressId: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
export function CheckoutAddress({
  addressId,
  onChange,
  disabled = false,
}: CheckoutAddressProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <SectionHeader />
      <AddressInput
        addressId={addressId}
        onChange={onChange}
        disabled={disabled}
      />
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
function AddressInput({ addressId, onChange, disabled }: CheckoutAddressProps) {
  return (
    <div className="mt-5">
      <label
        htmlFor="addressId"
        className="mb-2 block text-sm font-medium text-stone-700"
      >
        Address ID
      </label>
      <input
        id="addressId"
        value={addressId}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Masukkan address ID"
        disabled={disabled}
        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-stone-100"
      />
      <p className="mt-2 text-xs text-stone-400">
        
      </p>
    </div>
  );
}
