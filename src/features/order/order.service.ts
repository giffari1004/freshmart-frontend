import { api } from "@/lib/axios";
import { CreateOrderRequest, CreateOrderResponse, OrderDetail, OrderListItem, CancelOrderResponse } from "./order.type";

interface ApiResponse<T> { success: boolean; message?: string; data: T; }

export const orderService = {
  async createOrder(payload: CreateOrderRequest): Promise<CreateOrderResponse> {
    const { data } = await api.post<ApiResponse<CreateOrderResponse>>("/orders", payload);
    return data.data;
  },
  async getOrders(): Promise<OrderListItem[]> {
    const { data } = await api.get<ApiResponse<OrderListItem[]>>("/orders");
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
