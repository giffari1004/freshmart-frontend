import type { OrderStatus, OrderListSortBy, OrderListSortOrder } from "../order.type";

export type AdminOrderStatus = OrderStatus;

export type AdminOrderActionStatus = "PROCESSED" | "SHIPPED";

export type AdminOrderSortBy = OrderListSortBy;
export type AdminOrderSortOrder = OrderListSortOrder;

export type AdminOrder = {
  id: string;
  orderNumber: string;
  status: AdminOrderStatus;
  subtotal?: number;
  discountAmount?: number;
  shippingCost?: number;
  totalAmount: number;
  createdAt: string;
  store?: {
    id: string;
    name: string;
    code: string;
  };
};

export type AdminOrderPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type AdminOrderResponse = {
  success: boolean;
  message: string;
  data: {
    items: AdminOrder[];
    pagination: AdminOrderPagination;
  };
};
