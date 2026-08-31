import Link from "next/link";
import { Product } from "../schema";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
export function ProductCard({ product }: { product: Product }) {
  const images = product.product.images ?? [];
  const primaryImage = images.find((img) => img.isPrimary) ?? images[0];
  return (
    <Link href={`/products/${product.product.id}`} className="group block">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-stone-100">
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={product.product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-400">
              No image
            </div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              {product.product?.category?.name}
            </p>
            <h3 className="line-clamp-2 font-semibold text-stone-900">
              {product.product.name}
            </h3>
          </div>
          <p className="text-lg font-bold text-stone-900">
            {formatPrice(Number(product.product.basePrice))}
          </p>
          <Button className="h-10 w-full rounded-2xl bg-emerald-700 hover:bg-emerald-800">
            <ShoppingCart className="mr-2 size-4" />
            View product
          </Button>
        </div>
      </div>
    </Link>
  );
}
