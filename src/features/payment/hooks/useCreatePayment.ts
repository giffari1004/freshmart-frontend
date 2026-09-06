"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import { paymentService } from "../payment.service";

import {
  CreatePaymentRequest,
} from "../payment.type";

export function useCreatePayment() {
  return useMutation({
    mutationFn: (
      payload: CreatePaymentRequest,
    ) =>
      paymentService.createPayment(
        payload,
      ),
  });
}