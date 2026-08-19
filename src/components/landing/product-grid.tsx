"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/features/catalog/hooks";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  storeId: string | null;
  categoryId: string | null;
}

export function ProductGrid({ storeId, categoryId }: ProductGridProps) {
  const { data, isLoading } = useProducts({
    storeId: storeId ?? "",
    categoryId: categoryId ?? undefined,
    limit: 10,
  });

  return (
    <section id="products" className="space-y-6 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-foreground">
          Trending Products
        </h3>
        <Link
          href="/products"
          className="group flex items-center gap-1 text-sm font-bold text-primary"
        >
          View All
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {!storeId ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Detecting your nearest store...
        </p>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border p-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : !data?.products.length ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No products found for this store yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
