import { useQuery } from "@tanstack/react-query";
import { cartService } from "../cartService";

export function useCartPromotions(totalItems: number, subtotal: number, enabled = true) {
  return useQuery({
    queryKey: ["cart-promotions", totalItems, subtotal],
    queryFn: cartService.getPromotions,
    enabled,
    staleTime: 15_000,
  });
}
