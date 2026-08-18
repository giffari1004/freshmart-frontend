import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAdminOrders, updateAdminOrderStatus } from "./order-admin.service";

export function useAdminOrders(page: number, status?: string) {
  return useQuery({
    queryKey: ["admin-orders", page, status],
    queryFn: () => fetchAdminOrders({ page, limit: 10, status }),
  });
}

export function useUpdateAdminOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
}
