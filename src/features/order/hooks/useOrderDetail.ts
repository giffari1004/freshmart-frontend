import { useQuery } from "@tanstack/react-query";
import { orderService } from "../order.service";

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ["order-detail", id],
    queryFn: () => orderService.getOrderDetail(id),
    enabled: Boolean(id),
  });
}
