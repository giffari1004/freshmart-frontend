import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "./public-product-api";
import { getProductCatalogSchema } from "./schema";

export function useGetProducts(query: getProductCatalogSchema) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    enabled: !!query.storeId,
    placeholderData:keepPreviousData
  });
}

export function useGetProduct(productSlug: string, storeId: string) {
  return useQuery({
    queryKey: ["product", productSlug, storeId],
    queryFn: () => fetchProductById(productSlug, storeId),
    enabled: !!productSlug && !!storeId,
  });
}
