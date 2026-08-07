import { Product } from "../schema";
import { ProductCard } from "./product-card";
import { Inbox } from "lucide-react";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-stone-300 bg-white py-16 text-center">
        <Inbox className="size-12 text-stone-400" />
        <div className="space-y-1">
          <p className="font-semibold text-stone-900">No products found</p>
          <p className="text-sm text-stone-500">
            Try changing the search or filter
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}