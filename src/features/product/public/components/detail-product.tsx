import { Package } from "lucide-react";
import { ProductDetail } from "../constant";
import { ButtonCard } from "./button-card";
import { formatPrice } from "@/lib/helper-idr";
import { useAddToCart } from "@/features/cart/hooks";
interface DetailProductProps {
  product: ProductDetail;
}
export function DetailProduct({ product }: DetailProductProps) {
  const isOutOfStock = product.isOutOfStock;
  const item = product.stock ?? 0;
  const { mutate: addToCart , isPending } = useAddToCart();
    const handleAddToCart = () => {
      addToCart({
        storeProductId: product.storeProductId,
        quantity: 1,
      });
  };
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-stone-900">{product.name}</h1>
          <p className="text-2xl font-bold text-stone-900">
            {formatPrice(product.price)}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-stone-200">
              <Package className="size-5 text-stone-600" />
            </div>
            <div>
              <p className="font-medium text-stone-900">Stock available</p>
              <p className="text-sm text-stone-500">
                {item ? `${item} items ready` : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-stone-900">Description</h2>
          <p className="whitespace-pre-line text-sm leading-7 text-stone-600">
            {product.description || "No description available"}
          </p>
        </div>
        <div className="pt-2">
          <ButtonCard disabled={isOutOfStock} onAddToCart={handleAddToCart} isPending={isPending}/>
        </div>
      </div>
    </div>
  );
}
