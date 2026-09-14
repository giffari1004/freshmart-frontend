import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import { useCartStore } from "@/stores/cart-store";

export function useRemoveCart() {
  const queryClient = useQueryClient();
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useMutation({
    mutationFn: cartService.removeCartItem,
    onSuccess: (cart) => {
      setItemCount(cart.totalItems);
      queryClient.setQueryData(["cart"], cart);
      toast.success("Item removed");
    },
    onError: () => toast.error("Failed to remove item"),
  });
}
