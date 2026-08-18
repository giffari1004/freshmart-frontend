"use client";

import { useParams } from "next/navigation";
import { OrderDetailContent } from "@/features/order/components/OrderDetailContent";
import { useOrderDetail } from "@/features/order/hooks";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const query = useOrderDetail(params.id);

  if (query.isPending) return <div className="min-h-screen bg-stone-50 p-8 text-stone-500">Loading order...</div>;
  if (query.isError || !query.data) return <div className="min-h-screen bg-stone-50 p-8 text-red-600">Unable to load order.</div>;
  return <OrderDetailContent order={query.data} />;
}
