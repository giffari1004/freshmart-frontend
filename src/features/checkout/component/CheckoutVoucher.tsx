import { Tag } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutVoucherProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CheckoutVoucher({ value, onChange, disabled = false }: CheckoutVoucherProps) {
  return (
    <section>
      <CardHeader className="px-4 sm:px-5"><SectionHeader /></CardHeader>
      <CardContent className="space-y-2.5 px-4 sm:px-5">
        <Label htmlFor="userVoucherId">Voucher ID</Label>
        <Input id="userVoucherId" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter voucher ID (optional)" disabled={disabled} className="h-10" />
      </CardContent>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><Tag className="size-4" /></div>
      <div><CardTitle className="text-base font-semibold">Voucher</CardTitle><p className="text-xs text-muted-foreground">Add an optional voucher.</p></div>
    </div>
  );
}
