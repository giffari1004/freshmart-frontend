import { api } from "@/lib/axios";
import {
  createCategorySchema,
  getAllCategorySchema,
  updateCategorySchema,
} from "./schema";

export async function fetchCategories(query: getAllCategorySchema) {
  const { data } = await api.get("/categories", { params: query });
  return data;
}
export async function createCategory(body: createCategorySchema) {
  const { data } = await api.post("/categories", body);
  return data;
}
export async function updateCategory(id: string, body: updateCategorySchema) {
  const { data } = await api.patch(`/categories/${id}`,body);
  return data;
}
export async function deleteCategory(id: string) {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}
