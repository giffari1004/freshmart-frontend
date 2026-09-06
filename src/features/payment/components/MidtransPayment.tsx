"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  CreditCard,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from "lucide-react";

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

export function MidtransPayment({
  snapToken,
  orderId,
}: MidtransPaymentProps) {
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

      <div className="mx-auto w-[min(100%-2rem,36rem)] px-4 pb-10 pt-3">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white/95 shadow-[0_24px_55px_-28px_rgba(16,185,129,0.48)]">
          <div className="h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-lime-300" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
                {state === "opening" ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : null}
                {state === "success" ? <CheckCircle2 className="size-5" /> : null}
                {state === "pending" || state === "closed" ? (
                  <CreditCard className="size-5" />
                ) : null}
                {state === "error" ? <CircleAlert className="size-5 text-red-600" /> : null}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-stone-900">
                  {state === "opening" && "Opening secure payment..."}
                  {state === "success" && "Payment submitted"}
                  {state === "pending" && "Payment is pending"}
                  {state === "closed" && "Payment window closed"}
                  {state === "error" && "Payment could not be completed"}
                </p>
                <p className="mt-1 text-sm leading-6 text-stone-500">
                  {state === "success" &&
                    "Your order status will update after the payment gateway webhook is confirmed."}
                  {state === "pending" &&
                    "You can continue checking the order status from the order detail page."}
                  {state === "closed" &&
                    "The payment window was closed. You can reopen payment from the checkout flow."}
                  {state === "error" &&
                    "Please try again or return to your order details."}
                  {state === "opening" &&
                    "Please complete the payment in the secure Midtrans window."}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                <ShieldCheck className="size-4 text-emerald-700" />
                Secured by Midtrans Snap
              </div>
            </div>

            {state !== "opening" ? (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/orders/${orderId}`}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_12px_25px_-14px_rgba(5,150,105,0.9)] transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700"
                >
                  View Order Status
                  <ExternalLink className="size-4" />
                </Link>
              </div>
            ) : null}
          </div>
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
