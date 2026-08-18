"use client";

import { useCancelOrder } from "../hooks";

export function OrderCancelButton({ orderId }: { orderId: string }) {
  const mutation = useCancelOrder();
  if (mutation.isSuccess) return <p className="text-sm text-emerald-700">Order cancelled.</p>;
  return <button type="button" onClick={() => mutation.mutate(orderId)} disabled={mutation.isPending} className="h-11 rounded-xl border border-red-200 px-5 text-sm font-semibold text-red-600 disabled:opacity-50">{mutation.isPending ? "Cancelling..." : "Cancel Order"}</button>;
}
