import { api } from "@/lib/axios";
import { getProductCatalogSchema, Product } from "./schema";

export async function fetchProducts(query: getProductCatalogSchema) {
  const { data } = await api.get("/products", {
    params: query,
  });
  return data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
}
