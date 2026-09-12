import { MapPin } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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
  addressId, addresses, onChange, disabled = false,
  isLoading = false, isError = false,
}: CheckoutAddressProps) {
  return (
    <section>
      <CardHeader className="px-4 sm:px-5">
        <SectionHeader />
      </CardHeader>
      <CardContent className="space-y-3 px-4 sm:px-5">
        <Label htmlFor="addressId">Delivery address</Label>
        <AddressField {...{ addressId, addresses, onChange, disabled, isLoading, isError }} />
        <SelectedAddress address={addresses.find((item) => item.id === addressId)} />
      </CardContent>
    </section>
  );
}

function AddressField({
  addressId, addresses, onChange, disabled, isLoading, isError,
}: CheckoutAddressProps) {
  if (isLoading) return <Skeleton className="h-10 w-full" />;
  if (isError) return <Message text="Unable to load your addresses." />;
  if (!addresses.length) return <Message text="No delivery address is available for this account." />;
  return (
    <Select value={addressId} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id="addressId" className="h-10 w-full">
        <SelectValue placeholder="Select a delivery address" />
      </SelectTrigger>
      <SelectContent>
        {addresses.map((address) => <SelectItem key={address.id} value={address.id}>{address.label} · {address.recipientName} · {address.city}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function SelectedAddress({ address }: { address?: CheckoutOptionAddress }) {
  if (!address) return null;
  return (
    <div className="rounded-lg border border-border bg-accent/60 p-3 text-sm">
      <p className="font-semibold text-foreground">{address.recipientName} · {address.phone}</p>
      <p className="mt-1 leading-5 text-muted-foreground">{address.fullAddress}, {address.district}, {address.city}, {address.province}</p>
    </div>
  );
}

function Message({ text }: { text: string }) {
  return <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">{text}</div>;
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><MapPin className="size-4" /></div>
      <div>
        <CardTitle className="text-base font-semibold">Delivery Address</CardTitle>
        <p className="text-xs text-muted-foreground">Where should we deliver your order?</p>
      </div>
    </div>
  );
}
