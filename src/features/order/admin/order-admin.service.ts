import { api } from "@/lib/axios";
import {
  AdminOrderActionStatus,
  AdminOrderResponse,
  AdminOrderStatus,
} from "./order-admin.type";

export async function fetchAdminOrders(params: {
  page: number;
  limit: number;
  status?: AdminOrderStatus;
}) {
  const { data } = await api.get<AdminOrderResponse>(
    "/admin/orders",
    { params },
  );

  return data;
}

export async function updateAdminOrderStatus(input: {
  id: string;
  status: AdminOrderActionStatus;
}) {
  const { data } = await api.patch(
    `/admin/orders/${input.id}/status`,
    { status: input.status },
  );

  return data;
}
