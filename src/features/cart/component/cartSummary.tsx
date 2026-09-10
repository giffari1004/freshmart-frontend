"use client";

import Link from "next/link";
import { ArrowRight, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  onClear?: () => void;
  isClearing?: boolean;
}

export function CartSummary({
  totalItems,
  subtotal,
  onClear,
  isClearing = false,
}: CartSummaryProps) {
  const isEmpty = totalItems === 0;

  return (
    <aside className="relative h-fit overflow-hidden rounded-xl border border-border bg-background p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <SummaryHeader />

      <SummaryRows
        totalItems={totalItems}
        subtotal={subtotal}
      />

      <SummaryNotice />

      <SummaryActions
        isEmpty={isEmpty}
        onClear={onClear}
        isClearing={isClearing}
      />
    </aside>
  );
}

function SummaryHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
        <ReceiptText className="size-5" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Order Summary
        </h2>

        <p className="text-xs text-muted-foreground">
          Your current cart total
        </p>
      </div>
    </div>
  );
}

function SummaryRows({
  totalItems,
  subtotal,
}: {
  totalItems: number;
  subtotal: number;
}) {
  return (
    <div className="mt-7 space-y-4">
      <Row label="Total Items" value={String(totalItems)} />
      <Row label="Subtotal" value={formatPrice(subtotal)} strong />
    </div>
  );
}

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span
        className={
          strong
            ? "text-lg font-bold text-foreground"
            : "font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

function SummaryNotice() {
  return (
    <div className="mt-7 rounded-lg border border-border bg-accent p-4">
      <p className="text-xs leading-5 text-muted-foreground">
        Shipping and any eligible discounts are calculated during checkout.
      </p>
    </div>
  );
}

function SummaryActions({
  isEmpty,
  onClear,
  isClearing,
}: {
  isEmpty: boolean;
  onClear?: () => void;
  isClearing: boolean;
}) {
  return (
    <>
      <CheckoutButton disabled={isEmpty} />

      <Button
        type="button"
        variant="outline"
        disabled={isEmpty || isClearing || !onClear}
        className="mt-3 h-11 w-full rounded-xl border-border text-sm font-semibold hover:bg-background"
        onClick={onClear}
      >
        {isClearing ? "Clearing..." : "Clear Cart"}
      </Button>
    </>
  );
}

function CheckoutButton({ disabled }: { disabled: boolean }) {
  if (disabled) {
    return (
      <Button
        type="button"
        disabled
        className="mt-7 h-10 w-full rounded-lg text-sm font-semibold"
      >
        Proceed to Checkout
      </Button>
    );
  }

  return (
    <Button
      asChild
      className="mt-7 h-10 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/80"
    >
      <Link href="/cart/checkout">
        Proceed to Checkout
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}