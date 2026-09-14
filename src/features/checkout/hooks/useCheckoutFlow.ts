"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/hooks";
import { useCheckoutPreview } from "./useCheckoutPreview";
import { useCheckoutAddresses } from "./useCheckoutAddresses";
import { useCheckoutShippingOptions } from "./useCheckoutShippingOptions";
import { useCreateOrder } from "@/features/order/hooks";
import { useCreatePayment } from "@/features/payment/hooks";

type PreviewPayload = {
  addressId: string;
  shippingMethodId: string;
  userVoucherId?: string;
};

export function useCheckoutFlow() {
  const [addressId, setAddressId] = useState("");
  const [shippingMethodId, setShippingMethodId] = useState("");
  const [userVoucherId, setUserVoucherId] = useState("");
  const [snapToken, setSnapToken] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");

  const cart = useCart();
  const addresses = useCheckoutAddresses();
  const shippingOptions = useCheckoutShippingOptions(addressId);
  const preview = useCheckoutPreview(
  addressId,
  shippingMethodId,
  userVoucherId,
);
  const order = useCreateOrder();
  const payment = useCreatePayment();

  const disabled =
    preview.isFetching ||
    order.isPending ||
    payment.isPending;

  const canCreateOrder =
    Boolean(addressId) &&
    Boolean(shippingMethodId) &&
    Boolean(preview.data);

  useAddressValidation(
    addressId,
    addresses.data,
    setAddressId,
  );

  const changeAddress = (value: string) => {
    setAddressId(value);
    setShippingMethodId("");
  };

  const changeShipping = (value: string) => {
    setShippingMethodId(value);
  };

  const changeVoucher = (value: string) => {
    setUserVoucherId(value);
  };

  const handlePaymentSuccess = (result: {
    snapToken: string;
  }) => {
    setSnapToken(result.snapToken);
  };

  const handleOrderSuccess = (result: { id: string }) => {
    setCreatedOrderId(result.id);
    createPayment(result.id, payment, handlePaymentSuccess);
  };

  const handleCreateOrder = () => {
    if (!canCreateOrder) return;

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
    createdOrderId,
    cart,
    addresses,
    shippingOptions,
    preview,
    order,
    payment,
    disabled,
    canCreateOrder,
    changeAddress,
    changeShipping,
    changeVoucher,
    handleCreateOrder,
  };
}

function useAddressValidation(
  addressId: string,
  addresses: Array<{ id: string; isPrimary: boolean }> | undefined,
  setAddressId: (value: string) => void,
) {
  useEffect(() => {
    if (!addresses?.length) return;

    if (!addressId) {
      const primary = addresses.find((item) => item.isPrimary);
      setAddressId(primary?.id ?? addresses[0].id);
      return;
    }

    const exists = addresses.some((item) => item.id === addressId);

    if (!exists) setAddressId("");
  }, [addressId, addresses, setAddressId]);
}

function createPayment(
  orderId: string,
  payment: ReturnType<typeof useCreatePayment>,
  onSuccess: (result: { snapToken: string }) => void,
) {
  payment.mutate(
    { orderId },
    { onSuccess },
  );
}

function buildPayload(
  addressId: string,
  shippingMethodId: string,
  userVoucherId: string,
): PreviewPayload {
  return {
    addressId,
    shippingMethodId,
    ...(userVoucherId.trim()
      ? { userVoucherId }
      : {}),
  };
}