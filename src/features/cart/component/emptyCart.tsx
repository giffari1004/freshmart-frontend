"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-white px-6 py-20 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <ShoppingCart className="size-8" />
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-stone-900">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
        Looks like you haven&apos;t added any products yet. Explore the catalog and start your grocery order.
      </p>
      <Button
        asChild
        className="mt-8 h-11 rounded-xl bg-emerald-700 px-5 font-semibold hover:bg-emerald-800"
      >
        <Link href="/products">
          Continue Shopping
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
