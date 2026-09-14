import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import { useCartStore } from "@/stores/cart-store";

export function useClearCart() {
  const queryClient = useQueryClient();
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      setItemCount(0);
      queryClient.setQueryData(["cart"], undefined);
      toast.success("Cart cleared");
    },
    onError: () => toast.error("Failed to clear cart"),
  });
}
