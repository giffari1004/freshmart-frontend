import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../cartService";
import { UpdateCartPayload } from "../cartType";
import { toast } from "sonner";

export function useUpdateCart() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: UpdateCartPayload;
    }) =>
      cartService.updateCartItem(
        itemId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart updated");
    },

    onError: () => {
      toast.error("Failed to update cart");
    },
  });
}