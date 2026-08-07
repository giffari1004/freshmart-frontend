import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "./public-product-api";
import { getProductCatalogSchema } from "./schema";

export function useGetProducts(query: getProductCatalogSchema) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
  });
}
export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}