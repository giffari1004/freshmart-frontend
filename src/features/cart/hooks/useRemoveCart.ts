import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../cartService";
import { toast } from "sonner";

export function useRemoveCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Item removed");
    },

    onError: () => {
      toast.error("Failed to remove item");
    },
  });
}