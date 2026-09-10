"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/hooks";
import { useCheckoutPreview } from "./useCheckoutPreview";
import { useCheckoutAddresses } from "./useCheckoutAddresses";
import { useCheckoutShippingOptions } from "./useCheckoutShippingOptions";
import { useCreateOrder } from "@/features/order/hooks";
import { useCreatePayment } from "@/features/payment/hooks";

export function useCheckoutFlow() {
  const [addressId, setAddressId] = useState("");
  const [shippingMethodId, setShippingMethodId] = useState("");
  const [userVoucherId, setUserVoucherId] = useState("");
  const [snapToken, setSnapToken] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");

  const cart = useCart();
  const addresses = useCheckoutAddresses();
  const shippingOptions = useCheckoutShippingOptions(addressId);
  const preview = useCheckoutPreview();
  const order = useCreateOrder();
  const payment = useCreatePayment();

  const disabled =
    preview.isPending ||
    order.isPending ||
    payment.isPending;

  const canCreateOrder =
    Boolean(addressId) &&
    Boolean(shippingMethodId) &&
    Boolean(preview.data);

  useEffect(() => {
    if (!addressId && addresses.data?.length) {
      const primary = addresses.data.find(
        (item) => item.isPrimary,
      );

      setAddressId(
        primary?.id ?? addresses.data[0].id,
      );
      return;
    }

    if (
      addressId &&
      addresses.data &&
      !addresses.data.some(
        (item) => item.id === addressId,
      )
    ) {
      setAddressId("");
    }
  }, [addressId, addresses.data]);

  useEffect(() => {
    setShippingMethodId("");
    preview.reset();
  }, [addressId]);

  const changeAddress = (value: string) => {
    setAddressId(value);
    setShippingMethodId("");
    preview.reset();
  };

  const changeShipping = (value: string) => {
    setShippingMethodId(value);

    if (!addressId) {
      return;
    }

    preview.mutate(
      buildPayload(
        addressId,
        value,
        userVoucherId,
      ),
    );
  };

  const changeVoucher = (value: string) => {
    setUserVoucherId(value);

    if (!addressId || !shippingMethodId) {
      return;
    }

    preview.mutate(
      buildPayload(
        addressId,
        shippingMethodId,
        value,
      ),
    );
  };

  const handlePaymentSuccess = (result: {
    snapToken: string;
  }) => {
    setSnapToken(result.snapToken);
  };

  const handleOrderSuccess = (result: {
    id: string;
  }) => {
    setCreatedOrderId(result.id);

    payment.mutate(
      {
        orderId: result.id,
      },
      {
        onSuccess: handlePaymentSuccess,
      },
    );
  };

  const handleCreateOrder = () => {
    if (!canCreateOrder) {
      return;
    }

    order.mutate(
      buildPayload(
        addressId,
        shippingMethodId,
        userVoucherId,
      ),
      {
        onSuccess: handleOrderSuccess,
      },
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

function buildPayload(
  addressId: string,
  shippingMethodId: string,
  userVoucherId: string,
) {
  return {
    addressId,
    shippingMethodId,
    ...(userVoucherId.trim()
      ? { userVoucherId }
      : {}),
  };
}