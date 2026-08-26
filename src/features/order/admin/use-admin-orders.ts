import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchAdminOrders, updateAdminOrderStatus } from "./order-admin.service";
import { AdminOrderActionStatus, AdminOrderSortBy, AdminOrderSortOrder, AdminOrderStatus } from "./order-admin.type";
import { getOrderErrorMessage } from "../order-error";

export function useAdminOrders(
  page: number,
  status: AdminOrderStatus | undefined,
  sortBy: AdminOrderSortBy,
  sortOrder: AdminOrderSortOrder,
) {
  return useQuery({
    queryKey: ["admin-orders", page, status ?? "all", sortBy, sortOrder],
    queryFn: () =>
      fetchAdminOrders({
        page,
        limit: 10,
        status,
        sortBy,
        sortOrder,
      }),
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateAdminOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { id: string; status: AdminOrderActionStatus }) => updateAdminOrderStatus(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      toast.error(getOrderErrorMessage(error, "Unable to update order status"));
    },
  });
}
