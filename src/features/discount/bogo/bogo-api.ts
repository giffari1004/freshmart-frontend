import { api } from "@/lib/axios";
import { createBogoOutput, getBogoOutput, updateBogoOutput } from "./schema";

export async function fetchBogos(query: getBogoOutput) {
  const { data } = await api.get("/admin/bogo", { params: query });
  return data;
}
export async function createBogo(body: createBogoOutput) {
  const { data } = await api.post("/admin/bogo", body);
  return data;
}
export async function updateBogo(body: updateBogoOutput, id: string) {
  const { data } = await api.patch(`/admin/bogo/${id}`, body);
  return data;
}
export async function deleteBogo(id: string) {
  const { data } = await api.delete(`/admin/bogo/${id}`);
  return data;
}