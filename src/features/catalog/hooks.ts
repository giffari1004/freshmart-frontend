import { useQuery } from "@tanstack/react-query";
import { getProducts, type GetProductsParams } from "./api";

export function useProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled: !!params.storeId,
    staleTime: 60 * 1000,
  });
}
