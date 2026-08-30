import { useQuery } from "@tanstack/react-query";
import { orderService } from "../order.service";
import { OrderListQuery } from "../order.type";

export function useOrders(query: OrderListQuery) {
  return useQuery({
    queryKey: [
      "orders",
      query.page,
      query.limit,
      query.status ?? "ALL",
      query.orderNumber ?? "",
      query.fromDate ?? "",
      query.toDate ?? "",
      query.sortBy,
      query.sortOrder,
    ],
    queryFn: () => orderService.getOrders(query),
    placeholderData: (previousData) => previousData,
  });
}
