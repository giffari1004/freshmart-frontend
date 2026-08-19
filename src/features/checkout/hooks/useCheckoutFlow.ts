"use client";

import { useState } from "react";
import { useCheckoutPreview } from "./useCheckoutPreview";
import { useCreateOrder } from "@/features/order/hooks";
import { useCreatePayment } from "@/features/payment/hooks";

export function useCheckoutFlow() {
  const [addressId, setAddressId] = useState("");
  const [shippingMethodId, setShippingMethodId] = useState("");
  const [userVoucherId, setUserVoucherId] = useState("");
  const [snapToken, setSnapToken] = useState("");

  const preview = useCheckoutPreview();
  const order = useCreateOrder();
  const payment = useCreatePayment();
  const disabled =
    preview.isPending || order.isPending || payment.isPending;

  const resetPreview = () => preview.reset();

  const changeAddress = (value: string) => {
    setAddressId(value);
    resetPreview();
  };

  const changeShipping = (value: string) => {
    setShippingMethodId(value);
    resetPreview();
  };

  const changeVoucher = (value: string) => {
    setUserVoucherId(value);
    resetPreview();
  };

  const handlePreview = () => {
    if (!addressId || !shippingMethodId) return;

    preview.mutate(
      buildPayload(addressId, shippingMethodId, userVoucherId),
    );
  };

  const handlePaymentSuccess = (result: { snapToken: string }) => {
    setSnapToken(result.snapToken);
  };

  const handleOrderSuccess = (result: { id: string }) => {
    payment.mutate(
      { orderId: result.id },
      { onSuccess: handlePaymentSuccess },
    );
  };

  const handleCreateOrder = () => {
    if (!preview.data) return;

    order.mutate(
      buildPayload(addressId, shippingMethodId, userVoucherId),
      { onSuccess: handleOrderSuccess },
    );
  };

  return {
    addressId,
    shippingMethodId,
    userVoucherId,
    snapToken,
    preview,
    order,
    payment,
    disabled,
    changeAddress,
    changeShipping,
    changeVoucher,
    handlePreview,
    handleCreateOrder,
  };
}

function buildPayload(
  addressId: string,
  shippingMethodId: string,
  userVoucherId: string,
) {
  return {
    addressId,
    shippingMethodId,
    ...(userVoucherId.trim() ? { userVoucherId } : {}),
  };
}
