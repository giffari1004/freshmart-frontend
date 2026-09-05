import { api } from "@/lib/axios";
import {
  CancelOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderDetail,
  OrderListQuery,
  OrderListResponse,
} from "./order.type";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const orderService = {
  async createOrder(payload: CreateOrderRequest): Promise<CreateOrderResponse> {
    const { data } = await api.post<ApiResponse<CreateOrderResponse>>("/orders", payload);
    return data.data;
  },

  async getOrders(query: OrderListQuery): Promise<OrderListResponse> {
    const { data } = await api.get<ApiResponse<OrderListResponse>>("/orders", {
      params: query,
    });
    return data.data;
  },

  async getOrderDetail(orderId: string): Promise<OrderDetail> {
    const { data } = await api.get<ApiResponse<OrderDetail>>(`/orders/${orderId}`);
    return data.data;
  },

  async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    const { data } = await api.post<ApiResponse<CancelOrderResponse>>(
      `/orders/${orderId}/cancel`,
    );
    return data.data;
  },

  async confirmOrder(orderId: string): Promise<CancelOrderResponse> {
    const { data } = await api.post<ApiResponse<CancelOrderResponse>>(
      `/orders/${orderId}/confirm`,
    );
    return data.data;
  },
};
