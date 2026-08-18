import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../order.service";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.cancelOrder,
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
    },
  });
}
