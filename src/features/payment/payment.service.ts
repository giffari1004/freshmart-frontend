import { api } from "@/lib/axios";

import {
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "./payment.type";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const paymentService = {
  async createPayment(
    payload: CreatePaymentRequest,
  ): Promise<CreatePaymentResponse> {
    const { data } =
      await api.post<
        ApiResponse<CreatePaymentResponse>
      >("/payments", payload);

    return data.data;
  },
};