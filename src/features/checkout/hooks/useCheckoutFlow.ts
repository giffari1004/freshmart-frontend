"use client";
import { useState } from "react";
import { useCheckoutPreview } from "./useCheckoutPreview";
import { useCreateOrder } from "@/features/order/hooks";
import { useCreatePayment } from "@/features/payment/hooks";
export function useCheckoutFlow() {
  const [addressId, setAddressId] = useState(""), [shippingMethodId, setShippingMethodId] = useState(""), [userVoucherId, setUserVoucherId] = useState(""), [snapToken, setSnapToken] = useState("");
  const preview = useCheckoutPreview(), order = useCreateOrder(), payment = useCreatePayment(), disabled = preview.isPending || order.isPending || payment.isPending;
  const reset = () => preview.reset(), changeAddress = (v: string) => { setAddressId(v); reset(); }, changeShipping = (v: string) => { setShippingMethodId(v); reset(); }, changeVoucher = (v: string) => { setUserVoucherId(v); reset(); };
  const handlePreview = () => { if (addressId && shippingMethodId) preview.mutate(buildPayload(addressId, shippingMethodId, userVoucherId)); };
  const handlePaymentSuccess = (result: { snapToken: string }) => setSnapToken(result.snapToken);
  const handleOrderSuccess = (result: { id: string }) => payment.mutate({ orderId: result.id }, { onSuccess: handlePaymentSuccess });
  const handleCreateOrder = () => { if (preview.data) order.mutate(buildPayload(addressId, shippingMethodId, userVoucherId), { onSuccess: handleOrderSuccess }); };
  return { addressId, shippingMethodId, userVoucherId, snapToken, preview, order, payment, disabled, changeAddress, changeShipping, changeVoucher, handlePreview, handleCreateOrder };
}
function buildPayload(addressId: string, shippingMethodId: string, userVoucherId: string) { return { addressId, shippingMethodId, ...(userVoucherId.trim() ? { userVoucherId } : {}) }; }
