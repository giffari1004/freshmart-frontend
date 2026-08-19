export type AdminOrderStatus =
  | "WAITING_PAYMENT"
  | "PAID"
  | "WAITING_CONFIRMATION"
  | "PROCESSED"
  | "SHIPPED"
  | "CONFIRMED"
  | "CANCELLED";

export type AdminOrderActionStatus =
  | "PROCESSED"
  | "SHIPPED"
  | "CANCELLED";

export type AdminOrder = {
  id: string;
  orderNumber: string;
  status: AdminOrderStatus;
  totalAmount: number;
  createdAt: string;
  store: {
    id: string;
    name: string;
    code: string;
  };
};

export type AdminOrderResponse = {
  success: boolean;
  message: string;
  data: AdminOrder[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
};
