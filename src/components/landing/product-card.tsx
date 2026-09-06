"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useAddToCart } from "@/features/cart/hooks";
import type { Product } from "@/features/catalog/api";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => !!state.accessToken);
  const addToCart = useAddToCart();
  const image =
    product.images.find((img) => img.isPrimary)?.imageUrl ??
    product.images[0]?.imageUrl;
  const isDiscounted =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;
  function handleAddToCart() {
    if (!isLoggedIn) {
      toast.info("Please log in to add items to your cart");
      router.push("/login");
      return;
    }

    addToCart.mutate({ storeProductId: product.storeProductId, quantity: 1 });
  }

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-background transition-all duration-300",
        product.inStock ? "hover:border-primary" : "opacity-75 grayscale-[0.5]",
      )}
    >
      <div className="relative flex h-48 items-center justify-center bg-white p-4">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- gambar dari Cloudinary, remotePatterns belum tentu dikonfigurasi
          <img
            src={image}
            alt={product.name}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-24 w-24 animate-pulse rounded-full bg-muted" />
        )}

        {isDiscounted && product.inStock && (
          <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground hover:bg-destructive">
            Sale
          </Badge>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40">
            <span className="rounded-full bg-foreground/80 px-4 py-1 text-xs font-bold uppercase text-background">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        {product.category && (
          <p className="text-xs text-muted-foreground">
            {product.category.name}
          </p>
        )}
        <h4 className="font-semibold leading-tight text-foreground">
          {product.name}
        </h4>

        <div className="flex items-center justify-between pt-2">
          <span
            className={cn(
              "text-lg font-bold",
              product.inStock ? "text-primary" : "text-muted-foreground",
            )}
          >
            Rp{product.price.toLocaleString("id-ID")}
          </span>

          {product.inStock && (
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                product.stockAvailable <= 5
                  ? "border-warning/30 bg-warning/15 text-warning-foreground"
                  : "border-success/30 bg-success/15 text-success-foreground",
              )}
            >
              {product.stockAvailable <= 5 ? "Low Stock" : "In Stock"}
            </Badge>
          )}
        </div>

        <Button
          className="mt-2 w-full"
          variant={product.inStock ? "outline" : "secondary"}
          disabled={!product.inStock || addToCart.isPending}
          onClick={handleAddToCart}
        >
          {addToCart.isPending ? "Adding..." : "Add To Cart"}
        </Button>
      </div>
    </div>
  );
}
