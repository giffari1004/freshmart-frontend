"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProduct } from "@/features/product/public/hooks";
import { ImageProduct } from "@/features/product/public/components/image-product";
import { DetailProduct } from "@/features/product/public/components/detail-product";
export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = params.id as string;
  const storeId = searchParams.get("storeId") || "";
  const { data: product, isLoading } = useGetProduct(productId, storeId);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-2 lg:px-8">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-xl" />
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="h-8 w-40 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-stone-50 px-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-stone-900">
            Product not found
          </p>
          <p className="mt-2 text-sm text-stone-500">
            The product may have been removed or is unavailable for this store
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ImageProduct
            images={product.images}
            productName={product.name}
          />
          <DetailProduct product={product} />
        </div>
      </div>
    </div>
  );
}