"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="flex min-h-[370px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background p-8 text-center shadow-sm">
      <EmptyCartIcon />
      <EmptyCartMessage />
      <ContinueShopping />
    </div>
  );
}

function EmptyCartIcon() {
  return (
    <div className="flex size-16 items-center justify-center rounded-xl bg-accent text-primary">
      <ShoppingCart className="size-8" />
    </div>
  );
}

function EmptyCartMessage() {
  return (
    <>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
        Your cart is empty
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Looks like you haven&apos;t added any products yet. Explore the
        catalog and start your grocery order.
      </p>
    </>
  );
}

function ContinueShopping() {
  return (
    <Button
      asChild
      className="mt-8 h-10 rounded-lg bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/80"
    >
      <Link href="/products">
        Continue Shopping
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}