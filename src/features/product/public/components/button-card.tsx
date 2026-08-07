import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
interface ButtonCardProps {
  disabled?: boolean;
}
export function ButtonCard({
  disabled = false,
}: ButtonCardProps) {
  return (
    <Button
      disabled={disabled}
      className="h-12 w-full rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300"
    >
      <ShoppingCart className="mr-2 size-4" />
      Add to Cart
    </Button>
  );
}