import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import { AddToCartPayload } from "../cartType";
import { useCartStore } from "@/stores/cart-store";

export function useAddToCart() {
  const queryClient = useQueryClient();
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addToCart(payload),
    onSuccess: (cart) => {
      setItemCount(cart.totalItems);
      queryClient.setQueryData(["cart"], cart);
      toast.success("Product added to cart");
    },
    onError: () => toast.error("Failed to add product"),
  });
}
