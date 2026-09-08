import { Product } from "../constant";
import { ProductCard } from "./product-card";
import { Inbox } from "lucide-react";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No products found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.product.id} product={product} />
      ))}
    </div>
  );
}
