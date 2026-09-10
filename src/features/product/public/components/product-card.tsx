import Link from "next/link";
import { Product } from "../constant";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getDiscountBadge } from "./product-helper";

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
  const badge = getDiscountBadge(product.product.discounts);
  return (
    <Link
      href={`/products/${product.product.slug}`}
      className="group block h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {badge && (
            <span
              className={`absolute left-3 top-3 z-10 rounded-full ${badge.color} px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-md`}
            >
              {badge.label}
            </span>
          )}
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={product.product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-stone-400">
              No image available
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            {product.product.category?.name}
          </p>
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-stone-900">
            {product.product.name}
          </h3>
          <p className="text-lg font-extrabold text-stone-900">
            {formatPrice(Number(product.product.basePrice))}
          </p>
          <Button className="mt-auto h-10 w-full rounded-xl bg-emerald-700 text-xs font-semibold text-white hover:bg-emerald-800">
            <ShoppingCart className="mr-2 size-4" />
            View Product
          </Button>
        </div>
      </div>
    </Link>
  );
}
