import { Truck } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { CheckoutOptionShipping } from "../checkout.type";

interface CheckoutShippingProps {
  shippingMethodId: string;
  shippingMethods: CheckoutOptionShipping[];
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export function CheckoutShipping({
  shippingMethodId, shippingMethods, onChange,
  disabled = false, isLoading = false, isError = false,
}: CheckoutShippingProps) {
  const selected = shippingMethods.find((method) => method.id === shippingMethodId);
  return (
    <section>
      <CardHeader className="px-4 sm:px-5"><SectionHeader /></CardHeader>
      <CardContent className="space-y-3 px-4 sm:px-5">
        <Label htmlFor="shippingMethodId">Shipping method</Label>
        <ShippingField {...{ shippingMethodId, shippingMethods, onChange, disabled, isLoading, isError }} />
        {selected?.etd ? <p className="text-xs text-muted-foreground">Estimated delivery: {selected.etd}</p> : null}
      </CardContent>
    </section>
  );
}

function ShippingField({ shippingMethodId, shippingMethods, onChange, disabled, isLoading, isError }: CheckoutShippingProps) {
  if (isLoading) return <Skeleton className="h-10 w-full" />;
  if (isError) return <Message text="Unable to load shipping methods for the selected address." />;
  if (!shippingMethods.length) return <Message text="No shipping methods are available for this checkout." />;
  return (
    <Select value={shippingMethodId} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id="shippingMethodId" className="h-10 w-full"><SelectValue placeholder="Select a shipping method" /></SelectTrigger>
      <SelectContent>{shippingMethods.map((method) => <SelectItem key={method.id} value={method.id}>{method.serviceName} · Rp {Number(method.cost).toLocaleString("id-ID")}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function Message({ text }: { text: string }) {
  return <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">{text}</div>;
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><Truck className="size-4" /></div>
      <div><CardTitle className="text-base font-semibold">Shipping Method</CardTitle><p className="text-xs text-muted-foreground">Choose your preferred delivery option.</p></div>
    </div>
  );
}
