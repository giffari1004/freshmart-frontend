"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
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

export function OrderPayAgainButton({
  orderId,
}: OrderPayAgainButtonProps) {
  const payment = useCreatePayment();
  const [error, setError] = useState("");

  const handlePayAgain = async () => {
    setError("");

    try {
      const result = await payment.mutateAsync({ orderId });

      if (!window.snap) {
        setError("Payment gateway is not ready. Please try again.");
        return;
      }

      window.snap.pay(result.snapToken, {
        onSuccess: () => {
          setError("");
          window.location.href = `/orders/${orderId}`;
        },
        onPending: () => {
          setError("");
        },
        onError: () => {
          setError("Payment could not be completed.");
        },
        onClose: () => {
          setError("");
        },
      });
    } catch {
      setError("Unable to open payment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handlePayAgain}
        disabled={payment.isPending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {payment.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Opening...
          </>
        ) : (
          "Pay Again"
        )}
      </button>

      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  );
}