"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import { orderService } from "../order.service";

import {
  CreateOrderRequest,
} from "../order.type";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (
      payload: CreateOrderRequest,
    ) =>
      orderService.createOrder(
        payload,
      ),
  });
}