"use client";

import { useState } from "react";
import { AdminOrdersTable } from "@/features/order/admin/AdminOrdersTable";
import {
  useAdminOrders,
  useUpdateAdminOrderStatus,
} from "@/features/order/admin/use-admin-orders";
import {
  AdminOrderStatus,
  AdminOrderActionStatus,
} from "@/features/order/admin/order-admin.type";

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AdminOrderStatus | "">("");

  const { data, isPending, isError } = useAdminOrders(
    page,
    status || undefined,
  );

  const updateStatus = useUpdateAdminOrderStatus();

  const handleStatusChange = (
    id: string,
    nextStatus: AdminOrderActionStatus,
  ) => {
    updateStatus.mutate({
      id,
      status: nextStatus,
    });
  };

  // JSX kamu tetap
}