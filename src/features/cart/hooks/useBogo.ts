import { useQuery } from "@tanstack/react-query";
import { cartService } from "../cartService";

interface UseBogoParams {
  storeId: string | null;
  productId: string;
  quantity: number;
}

export function useBogo({
  storeId,
  productId,
  quantity,
}: UseBogoParams) {
  return useQuery({
    queryKey: ["bogo", storeId, productId, quantity],
    queryFn: () =>
      cartService.calculateBogo({
        storeId: storeId!,
        productId,
        quantity,
      }),
    enabled: Boolean(storeId) && quantity > 0,
    staleTime: 30_000,
  });
}