"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
interface CartSummaryProps {
  totalItems: number;
  subtotal: number;

  onClear?: () => void;
}

export function CartSummary({ totalItems, subtotal, onClear }: CartSummaryProps) {

  return (
    <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Total Items</span>

          <span className="font-medium">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Subtotal</span>

          <span className="font-semibold">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <Button asChild className="mt-8 w-full rounded-xl">
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
      <Button variant="outline" className="mt-3 w-full" onClick={onClear}>
        Clear Cart
      </Button>
    </div>
  );
}
