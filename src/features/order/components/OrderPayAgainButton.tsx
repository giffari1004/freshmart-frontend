"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/features/payment/hooks";

interface OrderPayAgainButtonProps {
  orderId: string;
}

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

export function OrderPayAgainButton({ orderId }: OrderPayAgainButtonProps) {
  const payment = useCreatePayment();
  const [error, setError] = useState("");

  const handlePayAgain = async () => {
    setError("");
    try {
      const result = await payment.mutateAsync({ orderId });
      openPayment(result.snapToken, orderId, setError);
    } catch {
      setError("Unable to open payment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        onClick={handlePayAgain}
        disabled={payment.isPending}
        className="h-11 rounded-lg px-5 text-sm font-semibold"
      >
        {payment.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {payment.isPending ? "Opening..." : "Pay Again"}
      </Button>
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

function openPayment(
  token: string,
  orderId: string,
  setError: (message: string) => void,
) {
  if (!window.snap) {
    setError("Payment gateway is not ready. Please try again.");
    return;
  }
  window.snap.pay(token, paymentOptions(orderId, setError));
}

function paymentOptions(orderId: string, setError: (message: string) => void) {
  return {
    onSuccess: () => {
      setError("");
      window.location.href = `/orders/${orderId}`;
    },
    onPending: () => setError(""),
    onError: () => setError("Payment could not be completed."),
    onClose: () => setError(""),
  };
}
