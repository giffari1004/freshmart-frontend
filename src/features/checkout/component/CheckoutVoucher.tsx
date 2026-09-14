import { Tag } from "lucide-react";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CheckoutVoucherOption } from "../checkout.type";

interface CheckoutVoucherProps {
  vouchers: CheckoutVoucherOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CheckoutVoucher({
  vouchers,
  value,
  onChange,
  disabled = false,
}: CheckoutVoucherProps) {
  return (
    <section>
      <CardHeader className="px-4 sm:px-5">
        <SectionHeader />
      </CardHeader>

      <CardContent className="space-y-3 px-4 sm:px-5">
        {vouchers.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Tidak ada voucher yang tersedia.
          </p>
        ) : (
          vouchers.map((voucher) => (
            <VoucherItem
              key={voucher.id}
              voucher={voucher}
              selected={value === voucher.id}
              disabled={disabled}
              onSelect={() =>
                onChange(
                  value === voucher.id ? "" : voucher.id,
                )
              }
            />
          ))
        )}
      </CardContent>
    </section>
  );
}

interface VoucherItemProps {
  voucher: CheckoutVoucherOption;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

function VoucherItem({
  voucher,
  selected,
  disabled,
  onSelect,
}: VoucherItemProps) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        selected ? "border-primary" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {voucher.code}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatVoucherValue(voucher)}
          </p>

          {voucher.minPurchaseAmount !== null && (
            <p className="text-xs text-muted-foreground">
              Min. pembelian{" "}
              {formatCurrency(voucher.minPurchaseAmount)}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant={selected ? "default" : "outline"}
          size="sm"
          disabled={disabled}
          onClick={onSelect}
        >
          {selected ? "Dipakai" : "Gunakan"}
        </Button>
      </div>
    </div>
  );
}

function formatVoucherValue(
  voucher: CheckoutVoucherOption,
) {
  if (voucher.valueType === "PERCENTAGE") {
    return `Diskon ${voucher.value}%`;
  }

  return `Diskon ${formatCurrency(voucher.value)}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
        <Tag className="size-4" />
      </div>

      <div>
        <CardTitle className="text-base font-semibold">
          Voucher
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          Pilih voucher yang ingin digunakan.
        </p>
      </div>
    </div>
  );
}