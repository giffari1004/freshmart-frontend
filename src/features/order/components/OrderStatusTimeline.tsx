import {
  Check,
  Circle,
  Clock3,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";
import type { OrderStatus } from "../order.type";
import { cn } from "@/lib/utils";

const steps = [
  {
    status: "WAITING_PAYMENT",
    label: "Menunggu Pembayaran",
    description: "Order dibuat dan menunggu pembayaran.",
    icon: Clock3,
  },
  {
    status: "PAID",
    label: "Pembayaran Diterima",
    description: "Pembayaran berhasil diterima melalui gateway.",
    icon: Check,
  },
  {
    status: "WAITING_CONFIRMATION",
    label: "Menunggu Konfirmasi Pembayaran",
    description: "Pembayaran sedang menunggu konfirmasi admin.",
    icon: Circle,
  },
  {
    status: "PROCESSED",
    label: "Diproses",
    description: "Pesanan sedang disiapkan oleh store.",
    icon: PackageCheck,
  },
  {
    status: "SHIPPED",
    label: "Dikirim",
    description: "Pesanan sudah dikirim ke alamat tujuan.",
    icon: Truck,
  },
  {
    status: "CONFIRMED",
    label: "Pesanan Dikonfirmasi",
    description: "Pesanan telah diterima dan dikonfirmasi.",
    icon: Check,
  },
] as const;

function getActiveIndex(status: OrderStatus) {
  if (status === "CANCELLED") return -1;
  return steps.findIndex((step) => step.status === status);
}

export function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  const activeIndex = getActiveIndex(status);

  if (status === "CANCELLED") {
    return (
      <section className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
        <div className="border-b border-red-100 bg-gradient-to-r from-red-50 to-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <XCircle className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-red-500">
                Order Status
              </p>
              <h2 className="text-base font-bold text-stone-900 sm:text-lg">
                Pesanan Dibatalkan
              </h2>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 sm:px-6">
          <p className="text-sm leading-6 text-stone-600">
            Pesanan ini sudah dibatalkan dan tidak dapat dilanjutkan ke tahap
            berikutnya.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 bg-gradient-to-r from-emerald-50 via-white to-white px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">
              Order Status
            </p>
            <h2 className="text-base font-bold text-stone-900 sm:text-lg">
              Perjalanan Pesanan
            </h2>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
            {steps[activeIndex]?.label ?? "Order"}
          </span>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <ol className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = activeIndex > index;
            const isCurrent = activeIndex === index;
            const isUpcoming = activeIndex < index;

            return (
              <li key={step.status} className="relative flex gap-4 pb-6 last:pb-0">
                {index < steps.length - 1 ? (
                  <span
                    className={cn(
                      "absolute left-[19px] top-10 h-[calc(100%-8px)] w-px",
                      isComplete ? "bg-emerald-400" : "bg-stone-200",
                    )}
                    aria-hidden="true"
                  />
                ) : null}

                <div
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-all",
                    isCurrent &&
                      "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-100",
                    isComplete && !isCurrent &&
                      "border-emerald-200 bg-emerald-50 text-emerald-600",
                    isUpcoming &&
                      "border-stone-200 bg-stone-50 text-stone-400",
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={cn(
                        "text-sm font-bold",
                        isCurrent && "text-stone-950",
                        isComplete && !isCurrent && "text-stone-700",
                        isUpcoming && "text-stone-400",
                      )}
                    >
                      {step.label}
                    </h3>
                    {isCurrent ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                        Saat ini
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-xs leading-5",
                      isUpcoming ? "text-stone-400" : "text-stone-500",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
