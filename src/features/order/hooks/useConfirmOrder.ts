import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../order.service";

export function useConfirmOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.confirmOrder,
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
    },
  });
}
