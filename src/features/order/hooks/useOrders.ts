import { useQuery } from "@tanstack/react-query";
import { orderService } from "../order.service";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
  });
}
