import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/api";
import { ShoppingCart } from "lucide-react";
interface ButtonCardProps {
  disabled?: boolean;
  onAddToCart: ()=>void
  isPending:boolean
}
export function ButtonCard({
  disabled = false,
  onAddToCart,
  isPending
}: ButtonCardProps) {
  return (
    <Button
      disabled={disabled || isPending}
      onClick={onAddToCart}
      className="h-12 w-full rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300"
    >
      <ShoppingCart className="mr-2 size-4 shimmer-color-green-400" />
      {isPending ? "Adding..." : "Add To Cart"}
    </Button>
  );
}