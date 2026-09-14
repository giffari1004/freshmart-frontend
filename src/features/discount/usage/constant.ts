import { Limelight } from "next/font/google";
import { number } from "zod";

export const USAGE_SORT_BY = ["createdAt", "amountDeducted"] as const;
export const USAGE_SORT_ORDER = ["asc", "desc"] as const;
export interface DiscountUsageRow {
  id: string;
  discountId: string;
  userId: string;
  orderId: string;
  amountDeducted: number;
  userVoucherId: string | null;
  createdAt: string;
  discount: {
    id: string;
    type: "DIRECT" | "MIN_PURCHASE" | "BUY1GET1";
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  order: {
    id: string;
    orderNumber: string;
  };
}
export interface DiscountMeta {
    page: number,
    limit: number,
    totalData: number,
    totalPages: number
}