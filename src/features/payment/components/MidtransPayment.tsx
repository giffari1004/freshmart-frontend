"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, CircleAlert, CreditCard, Loader2 } from "lucide-react";

interface MidtransPaymentProps {
  snapToken: string;
  orderId: string;
}

interface SnapOptions {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: SnapOptions) => void;
    };
  }
}

type PaymentState = "opening" | "success" | "pending" | "error" | "closed";

export function MidtransPayment({ snapToken, orderId }: MidtransPaymentProps) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<PaymentState>("opening");

  useOpenSnap(snapToken, ready, setState);

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setState("error")}
      />

      <div className="mx-auto w-[min(100%-2rem,32rem)] px-4 pb-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            {state === "opening" ? <Loader2 className="mt-0.5 size-5 animate-spin text-emerald-700" /> : null}
            {state === "success" ? <CheckCircle2 className="mt-0.5 size-5 text-emerald-700" /> : null}
            {state === "pending" || state === "closed" ? <CreditCard className="mt-0.5 size-5 text-sky-700" /> : null}
            {state === "error" ? <CircleAlert className="mt-0.5 size-5 text-red-600" /> : null}
            <div>
              <p className="font-semibold text-stone-900">
                {state === "opening" && "Opening secure payment..."}
                {state === "success" && "Payment submitted"}
                {state === "pending" && "Payment is pending"}
                {state === "closed" && "Payment window closed"}
                {state === "error" && "Payment could not be completed"}
              </p>
              <p className="mt-1 text-sm text-stone-500">
                {state === "success" && "Your order status will update after the payment gateway webhook is confirmed."}
                {state === "pending" && "You can continue checking the order status from the order detail page."}
                {state === "closed" && "The payment window was closed. You can reopen payment from the checkout flow."}
                {state === "error" && "Please try again or return to your order details."}
                {state === "opening" && "Please complete the payment in the secure Midtrans window."}
              </p>
            </div>
          </div>

          {state !== "opening" ? (
            <div className="mt-4">
              <Link
                href={`/orders/${orderId}`}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                View Order Status
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function useOpenSnap(
  token: string,
  ready: boolean,
  setState: (state: PaymentState) => void,
) {
  const opened = useRef(false);

  useEffect(() => {
    if (!token || !ready || !window.snap || opened.current) return;

    opened.current = true;
    setState("opening");

    window.snap.pay(token, {
      onSuccess: () => setState("success"),
      onPending: () => setState("pending"),
      onError: () => setState("error"),
      onClose: () => setState("closed"),
    });
  }, [token, ready, setState]);
}
