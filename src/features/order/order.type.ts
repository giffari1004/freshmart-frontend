export interface CreateOrderRequest {
  addressId: string;
  shippingMethodId: string;
  userVoucherId?: string;
}

export interface CreateOrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export type OrderDetailItem = CreateOrderItem;

export type OrderStatus =
  | "WAITING_PAYMENT"
  | "PAID"
  | "WAITING_CONFIRMATION"
  | "PROCESSED"
  | "SHIPPED"
  | "CONFIRMED"
  | "CANCELLED";

export interface CreateOrderResponse {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  items: CreateOrderItem[];
}

export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  createdAt: string;
}

export type OrderListStatus = OrderStatus;
export type OrderListSortBy =
  | "createdAt"
  | "totalAmount"
  | "orderNumber"
  | "status";

export type OrderListSortOrder = "asc" | "desc";

export interface OrderListQuery {
  page: number;
  limit: number;
  status?: OrderListStatus;
  orderNumber?: string;
  fromDate?: string;
  toDate?: string;
  sortBy: OrderListSortBy;
  sortOrder: OrderListSortOrder;
}

export interface OrderListPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface OrderListResponse {
  items: OrderListItem[];
  pagination: OrderListPagination;
}

export interface OrderDetail extends OrderListItem {
  store: {
    id: string;
    name: string;
    code: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    address?: string;
  };
  deliveryAddress: {
    recipientName: string;
    recipientPhone: string;
    province: string;
    city: string;
    district: string;
    fullAddress: string;
    postalCode?: string | null;
  };
  shipping: {
    id: string;
    courierCode: string;
    serviceCode: string;
    serviceName: string;
    cost: number;
    etd: string | null;
  };
  items: OrderDetailItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  payment: { method: string; status: string; amount: number } | null;
}

export interface CancelOrderResponse {
  id: string;
  status: OrderStatus;
}
