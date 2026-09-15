"use client";

import { useMyVouchers } from "@/features/discount/voucher/hooks";
import { TicketPercent, CalendarDays, CircleCheck, Copy } from "lucide-react";
import { toast } from "sonner";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export function MyVoucherSection() {
  const { data: vouchers = [], isLoading } = useMyVouchers();

  const copyVoucher = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success(`Voucher ${code} copied`);
  };

  return (
    <section className="border border-border bg-background rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <TicketPercent className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground">My Vouchers</h2>
          <p className="text-sm text-muted-foreground">
            Vouchers available for your next purchase
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-24 rounded-lg bg-muted animate-pulse" />
        </div>
      ) : vouchers.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-8 text-center">
          <TicketPercent className="h-8 w-8 mx-auto text-muted-foreground mb-2" />

          <p className="font-medium text-foreground">No vouchers available</p>

          <p className="text-sm text-muted-foreground mt-1">
            Your available vouchers will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Voucher Code</p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary">
                      {item.voucher.code}
                    </span>

                    <button
                      type="button"
                      onClick={() => copyVoucher(item.voucher.code)}
                      className="text-muted-foreground hover:text-primary"
                      title="Copy voucher code"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                  <CircleCheck className="h-3 w-3" />
                  AVAILABLE
                </span>
              </div>

              <div>
                <p className="text-2xl font-bold text-foreground">
                  {item.voucher.valueType === "PERCENTAGE"
                    ? `${item.voucher.value}% OFF`
                    : formatCurrency(item.voucher.value)}
                </p>

                {item.voucher.maxDiscountAmount && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum discount{" "}
                    {formatCurrency(item.voucher.maxDiscountAmount)}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3">
                <CalendarDays className="h-3.5 w-3.5" />
                Valid until {formatDate(item.voucher.expiredAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
