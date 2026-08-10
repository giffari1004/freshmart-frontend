import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../cartService";
import { toast } from "sonner";

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart cleared");
    },

    onError: () => {
      toast.error("Failed to clear cart");
    },
  });
}