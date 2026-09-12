import { Check, Clock3, PackageCheck, Truck, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "../order.type";
import { cn } from "@/lib/utils";

const steps = [
  ["WAITING_PAYMENT", "Menunggu Pembayaran", "Order dibuat dan menunggu pembayaran.", Clock3],
  ["PAID", "Pembayaran Diterima", "Pembayaran berhasil diterima melalui gateway.", Check],
  ["PROCESSED", "Diproses", "Pesanan sedang disiapkan oleh store.", PackageCheck],
  ["SHIPPED", "Dikirim", "Pesanan sudah dikirim ke alamat tujuan.", Truck],
  ["CONFIRMED", "Pesanan Dikonfirmasi", "Pesanan telah diterima dan dikonfirmasi.", Check],
] as const;

function getActiveIndex(status: OrderStatus) {
  return status === "CANCELLED" ? -1 : steps.findIndex(([value]) => value === status);
}

export function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  if (status === "CANCELLED") return <CancelledTimeline />;
  return <ActiveTimeline activeIndex={getActiveIndex(status)} />;
}

function CancelledTimeline() {
  return (
    <Card className="border-destructive/30 shadow-sm">
      <CardHeader className="border-b border-destructive/20 bg-destructive/5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <XCircle className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-destructive">Order Status</p>
            <h2 className="font-semibold text-foreground">Pesanan Dibatalkan</h2>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground">
          Pesanan ini sudah dibatalkan dan tidak dapat dilanjutkan ke tahap berikutnya.
        </p>
      </CardContent>
    </Card>
  );
}

function ActiveTimeline({ activeIndex }: { activeIndex: number }) {
  const currentLabel = steps[activeIndex]?.[1] ?? "Order";
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Order Status</p>
          <h2 className="font-semibold text-foreground">Perjalanan Pesanan</h2>
        </div>
        <Badge variant="secondary">{currentLabel}</Badge>
      </CardHeader>
      <CardContent className="pt-5">
        <ol>
          {steps.map((step, index) => (
            <TimelineStep key={step[0]} step={step} index={index} activeIndex={activeIndex} />
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function TimelineStep({
  step,
  index,
  activeIndex,
}: {
  step: (typeof steps)[number];
  index: number;
  activeIndex: number;
}) {
  const Icon = step[3];
  const complete = activeIndex > index;
  const current = activeIndex === index;
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {index < steps.length - 1 ? <TimelineLine complete={complete} /> : null}
      <div className={cn("relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border", current && "border-primary bg-primary text-primary-foreground", complete && !current && "border-border bg-accent text-primary", !current && !complete && "border-border bg-background text-muted-foreground")}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={cn("text-sm font-semibold", !current && !complete && "text-muted-foreground")}>{step[1]}</h3>
          {current ? <Badge variant="secondary" className="text-[10px]">Saat ini</Badge> : null}
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{step[2]}</p>
      </div>
    </li>
  );
}

function TimelineLine({ complete }: { complete: boolean }) {
  return <span className={cn("absolute left-[17px] top-9 h-[calc(100%-4px)] w-px", complete ? "bg-primary/60" : "bg-border")} aria-hidden="true" />;
}
