import { useQuery } from "@tanstack/react-query";
import { cartService } from "../cartService";

export function useCart(enabled = true) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
    enabled,
  });
}
