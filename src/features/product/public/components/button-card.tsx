import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
interface ButtonCardProps {
  disabled?: boolean;
  onAddToCart: () => void;
  isPending: boolean;
}
export function ButtonCard({
  disabled = false,
  onAddToCart,
  isPending,
}: ButtonCardProps) {
  return (
    <Button
      disabled={disabled || isPending}
      onClick={onAddToCart}
      className="h-10 sm:h-12 w-full rounded-full bg-emerald-700 px-3 text-xs sm:text-sm text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300"
    >
      <ShoppingCart className="mr-2 h-4 w-4 shrink-0" />
      <span className="truncate">
        {isPending ? "Adding..." : "Add to Cart"}
      </span>
    </Button>
  );
}
