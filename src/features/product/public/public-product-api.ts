import { api } from "@/lib/axios";
import { getProductCatalogSchema } from "./schema";

export async function fetchProducts(query: getProductCatalogSchema) {
  const { data } = await api.get("/products", {
    params: query,
  });
  return data;
}

export async function fetchProductById(id: string, storeId: string) {
  const { data } = await api.get(`/products/${id}`, { params: { storeId } });
  return data.data;
}
