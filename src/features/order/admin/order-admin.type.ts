export type AdminOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  store: { id: string; name: string; code: string };
};

export type AdminOrderStatus = "PROCESSING" | "SHIPPED" | "CANCELLED";

export type AdminOrderResponse = {
  success: boolean;
  message: string;
  data: AdminOrder[];
  meta: { page: number; limit: number; totalData: number; totalPages: number };
};
