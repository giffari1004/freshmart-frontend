import { api } from "@/lib/axios";
import { createStoreAdminSchema, getAllUserSchema, updateStoreAdminSchema } from "./schema";

export async function fetchUsers(query:getAllUserSchema) {
  const { data } = await api.get("/admin/users" , {params: query});
  return data;
}
export async function createAdmins(body:createStoreAdminSchema) {
  const { data } = await api.post("/admin/store-admins",body);
  return data;
}
export async function updateAdmins(id: string , body:updateStoreAdminSchema) {
  const { data } = await api.patch(`/admin/store-admins/${id}` , body);
  return data;
}
export async function deleteAdmins(id: string) {
  const { data } = await api.delete(`/admin/store-admins/${id}`);
  return data;
}
