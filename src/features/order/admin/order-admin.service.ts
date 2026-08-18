import { api } from "@/lib/axios";
import { AdminOrderResponse, AdminOrderStatus } from "./order-admin.type";

export async function fetchAdminOrders(params: {
  page: number;
  limit: number;
  status?: string;
}) {
  const { data } = await api.get<AdminOrderResponse>("/admin/orders", { params });
  return data;
}

export async function updateAdminOrderStatus(input: {
  id: string;
  status: AdminOrderStatus;
}) {
  const { data } = await api.patch(`/admin/orders/${input.id}/status`, {
    status: input.status,
  });
  return data;
}
