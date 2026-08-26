"use client";

import { useEffect, useState } from "react";
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

  const addresses = useCheckoutAddresses();

  const shippingOptions =
    useCheckoutShippingOptions(addressId);

  const preview = useCheckoutPreview();

  const order = useCreateOrder();

  const payment = useCreatePayment();

  const disabled =
    preview.isPending ||
    order.isPending ||
    payment.isPending;

  const canPreview =
    Boolean(addressId) &&
    Boolean(shippingMethodId);

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

  useEffect(() => {
    if (
      !shippingMethodId &&
      shippingOptions.data?.length
    ) {
      setShippingMethodId(
        shippingOptions.data[0].id,
      );
    }
  }, [
    shippingMethodId,
    shippingOptions.data,
  ]);

  const changeAddress = (value: string) => {
    setAddressId(value);
    setShippingMethodId("");
    preview.reset();
  };

  const changeShipping = (value: string) => {
    setShippingMethodId(value);
    preview.reset();
  };

  const changeVoucher = (value: string) => {
    setUserVoucherId(value);
    preview.reset();
  };

  const handlePreview = () => {
    if (!canPreview) {
      return;
    }

    preview.mutate(
      buildPayload(
        addressId,
        shippingMethodId,
        userVoucherId,
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
    if (
      !preview.data ||
      !canPreview
    ) {
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

    addresses,
    shippingOptions,
    preview,
    order,
    payment,

    disabled,
    canPreview,

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
    ...(userVoucherId.trim()
      ? { userVoucherId }
      : {}),
  };
}