import { api } from "@/lib/axios";
import { getAllProductSchema, updateProductSchema } from "./schema";

export async function fetchProducts(query: getAllProductSchema) {
  const { data } = await api.get("/admin/products", { params: query });
  return data;
}
export async function createProduct(formData: FormData) {
  const { data } = await api.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
export async function updateProduct(id: string, body: updateProductSchema) {
  const { data } = await api.patch(`/admin/products/${id}`, body);
  return data;
}
export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
}
