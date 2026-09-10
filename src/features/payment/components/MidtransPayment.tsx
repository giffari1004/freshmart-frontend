"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

type PaymentState =
  | "opening"
  | "success"
  | "pending"
  | "error"
  | "closed";

export function MidtransPayment({
  snapToken,
  orderId,
}: MidtransPaymentProps) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<PaymentState>("opening");
  const [openRequest, setOpenRequest] = useState(0);

  useSnapReady(setReady);
  useOpenSnap(snapToken, ready, openRequest, setState);

  return (
    <PaymentCard
      orderId={orderId}
      state={state}
      onPayAgain={() => setOpenRequest((value) => value + 1)}
    />
  );
}

interface PaymentCardProps {
  orderId: string;
  state: PaymentState;
  onPayAgain: () => void;
}

function PaymentCard({
  orderId,
  state,
  onPayAgain,
}: PaymentCardProps) {
  return (
    <div className="mx-auto w-[min(100%-2rem,36rem)] px-4 pb-10 pt-3">
      <div className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white/95 shadow-[0_24px_55px_-28px_rgba(16,185,129,0.48)]">
        <div className="h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-lime-300" />

        <div className="p-5 sm:p-6">
          <PaymentHeader state={state} />

          <PaymentSecurity />

          {state !== "opening" ? (
            <PaymentActions
              orderId={orderId}
              state={state}
              onPayAgain={onPayAgain}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PaymentHeader({ state }: { state: PaymentState }) {
  const content = getPaymentContent(state);

  return (
    <div className="flex items-start gap-3">
      <PaymentIcon state={state} />

      <div className="min-w-0">
        <p className="font-bold text-stone-900">{content.title}</p>
        <p className="mt-1 text-sm leading-6 text-stone-500">
          {content.description}
        </p>
      </div>
    </div>
  );
}

function getPaymentContent(state: PaymentState) {
  const content = {
    opening: {
      title: "Opening secure payment...",
      description:
        "Please complete the payment in the secure Midtrans window.",
    },
    success: {
      title: "Payment submitted",
      description:
        "Your order status will update after the payment gateway webhook is confirmed.",
    },
    pending: {
      title: "Payment is pending",
      description:
        "You can continue checking the order status from the order detail page.",
    },
    closed: {
      title: "Payment window closed",
      description:
        "The payment window was closed. You can reopen payment.",
    },
    error: {
      title: "Payment could not be completed",
      description:
        "Please try again or return to your order details.",
    },
  };

  return content[state];
}

function PaymentIcon({ state }: { state: PaymentState }) {
  if (state === "opening") {
    return (
      <div className={iconClass}>
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className={iconClass}>
        <CheckCircle2 className="size-5" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={iconClass}>
        <CircleAlert className="size-5 text-red-600" />
      </div>
    );
  }

  return (
    <div className={iconClass}>
      <CreditCard className="size-5" />
    </div>
  );
}

const iconClass =
  "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm";

function PaymentSecurity() {
  return (
    <div className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
        <ShieldCheck className="size-4 text-emerald-700" />
        Secured by Midtrans Snap
      </div>
    </div>
  );
}

interface PaymentActionsProps {
  orderId: string;
  state: PaymentState;
  onPayAgain: () => void;
}

function PaymentActions({
  orderId,
  state,
  onPayAgain,
}: PaymentActionsProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      {state === "closed" || state === "error" ? (
        <button
          type="button"
          onClick={onPayAgain}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-100"
        >
          Pay Again
        </button>
      ) : null}

      <Link
        href={`/orders/${orderId}`}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_12px_25px_-14px_rgba(5,150,105,0.9)] transition hover:-translate-y-0.5"
      >
        View Order Status
        <ExternalLink className="size-4" />
      </Link>
    </div>
  );
}

function useSnapReady(setReady: (ready: boolean) => void) {
  useEffect(() => {
    const syncReady = () => setReady(Boolean(window.snap));

    syncReady();
    window.addEventListener("midtrans:snap-ready", syncReady);

    return () =>
      window.removeEventListener("midtrans:snap-ready", syncReady);
  }, [setReady]);
}

function useOpenSnap(
  token: string,
  ready: boolean,
  openRequest: number,
  setState: (state: PaymentState) => void,
) {
  useEffect(() => {
    if (!token || !ready || !window.snap) return;

    setState("opening");

    window.snap.pay(token, {
      onSuccess: () => setState("success"),
      onPending: () => setState("pending"),
      onError: () => setState("error"),
      onClose: () => setState("closed"),
    });
  }, [token, ready, openRequest, setState]);
}