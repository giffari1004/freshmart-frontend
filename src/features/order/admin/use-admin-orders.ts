import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
} from "./order-admin.service";
import {
  AdminOrderActionStatus,
  AdminOrderStatus,
} from "./order-admin.type";

export function useAdminOrders(
  page: number,
  status?: AdminOrderStatus,
) {
  return useQuery({
    queryKey: ["admin-orders", page, status ?? "all"],
    queryFn: () =>
      fetchAdminOrders({
        page,
        limit: 10,
        status,
      }),
  });
}

export function useUpdateAdminOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      id: string;
      status: AdminOrderActionStatus;
    }) => updateAdminOrderStatus(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });
    },
  });
}
