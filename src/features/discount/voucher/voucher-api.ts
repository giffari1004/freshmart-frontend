import { api } from "@/lib/axios";
import {
  createVoucherOutput,
  getAllVoucherSchema,
  MyVoucher,
  updateVoucherOutput,
} from "./schema";
export async function fetchVoucher(query: getAllVoucherSchema) {
  const { data } = await api.get("/admin/vouchers", { params: query });
  return data;
}
export async function createVoucher(body: createVoucherOutput) {
  const { data } = await api.post("/admin/vouchers", body);
  return data;
}
export async function updateVoucher(body: updateVoucherOutput, id: string) {
  const { data } = await api.patch(`/admin/vouchers/${id}`, body);
  return data;
}
export async function deleteVoucher(id: string) {
  const { data } = await api.delete(`/admin/vouchers/${id}`);
  return data;
}
export async function getVoucherById(id: string) {
  const { data } = await api.get(`/admin/vouchers/${id}`);
  return data;
}
export async function getMyVouchers(): Promise<MyVoucher[]> {
  const { data } = await api.get("/vouchers/my");

  return data.data;
}