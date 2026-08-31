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
  return (
    <aside className="relative h-fit overflow-hidden rounded-[1.75rem] border border-emerald-200/70 bg-white/95 p-6 shadow-[0_20px_45px_-28px_rgba(16,185,129,0.45)] lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
          <ReceiptText className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>
          <p className="text-xs text-stone-500">Your current cart total</p>
        </div>
      </div>

      <SummaryRows totalItems={totalItems} subtotal={subtotal} />

      <div className="mt-7 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 p-4">
        <p className="text-xs leading-5 text-stone-500">
          Shipping and any eligible discounts are calculated during checkout.
        </p>
      </div>

      <SummaryActions
        totalItems={totalItems}
        onClear={onClear}
        isClearing={isClearing}
      />
    </aside>
  );
}

function SummaryRows({
  totalItems,
  subtotal,
}: Pick<CartSummaryProps, "totalItems" | "subtotal">) {
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
      <span className="text-stone-500">{label}</span>
      <span className={strong ? "text-lg font-bold text-stone-900" : "font-semibold text-stone-900"}>
        {value}
      </span>
    </div>
  );
}

function SummaryActions({
  totalItems,
  onClear,
  isClearing,
}: Pick<CartSummaryProps, "totalItems" | "onClear" | "isClearing">) {
  return (
    <>
      <Button
        asChild
        className="mt-7 h-12 w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 text-sm font-extrabold shadow-[0_12px_25px_-14px_rgba(5,150,105,0.9)] transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700"
      >
        <Link href="/cart/checkout">
          Proceed to Checkout
          <ArrowRight className="size-4" />
        </Link>
      </Button>

      <Button
        type="button"
        variant="outline"
        disabled={isClearing || totalItems === 0}
        className="mt-3 h-11 w-full rounded-xl border-stone-200 text-sm font-semibold hover:bg-stone-50"
        onClick={onClear}
      >
        {isClearing ? "Clearing..." : "Clear Cart"}
      </Button>
    </>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
