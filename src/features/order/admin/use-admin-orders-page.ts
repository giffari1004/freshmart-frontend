import { useState } from "react";
import { useAdminOrders, useUpdateAdminOrderStatus } from "./use-admin-orders";
import { AdminOrderActionStatus, AdminOrderSortBy, AdminOrderSortOrder, AdminOrderStatus } from "./order-admin.type";

export function useAdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AdminOrderStatus | "">("");
  const [sortBy, setSortBy] = useState<AdminOrderSortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<AdminOrderSortOrder>("desc");
  const [pendingAction, setPendingAction] = useState<{ id: string; status: AdminOrderActionStatus } | null>(null);
  const orders = useAdminOrders(page, status || undefined, sortBy, sortOrder);
  const updateStatus = useUpdateAdminOrderStatus();
  return { page, setPage, status, setStatus, sortBy, setSortBy, sortOrder, setSortOrder, pendingAction, setPendingAction, orders, updateStatus };
}
