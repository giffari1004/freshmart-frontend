import { Check, Clock3, PackageCheck, Truck, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus, OrderStatusHistory } from "../order.type";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const steps = [
  ["WAITING_PAYMENT", "Menunggu Pembayaran", "Order dibuat dan menunggu pembayaran.", Clock3],
  ["PAID", "Pembayaran Diterima", "Pembayaran berhasil diterima melalui gateway.", Check],
  ["PROCESSED", "Diproses", "Pesanan sedang disiapkan oleh store.", PackageCheck],
  ["SHIPPED", "Dikirim", "Pesanan sudah dikirim ke alamat tujuan.", Truck],
  ["CONFIRMED", "Pesanan Dikonfirmasi", "Pesanan telah diterima dan dikonfirmasi.", Check],
] as const;

export function OrderStatusTimeline({ status, statusHistory }: { status: OrderStatus; statusHistory: OrderStatusHistory[] }) {
  if (status === "CANCELLED") return <CancelledTimeline history={statusHistory} />;
  const activeIndex = steps.findIndex(([value]) => value === status);
  return <ActiveTimeline activeIndex={activeIndex} history={statusHistory} />;
}

function CancelledTimeline({ history }: { history: OrderStatusHistory[] }) {
  const cancellation = history.find((item) => item.status === "CANCELLED");
  return (
    <Card className="border-destructive/30 shadow-sm">
      <CardHeader className="border-b border-destructive/20 bg-destructive/5 py-4"><TimelineHeading icon={<XCircle className="size-5" />} title="Pesanan Dibatalkan" destructive /></CardHeader>
      <CardContent className="pt-4"><HistoryText item={cancellation} fallback="Pesanan ini sudah dibatalkan dan tidak dapat dilanjutkan ke tahap berikutnya." /></CardContent>
    </Card>
  );
}

function ActiveTimeline({ activeIndex, history }: { activeIndex: number; history: OrderStatusHistory[] }) {
  const currentLabel = steps[activeIndex]?.[1] ?? "Order";
  return (
    <Card className="shadow-sm"><CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border py-4"><TimelineHeading title="Perjalanan Pesanan" /><Badge variant="secondary">{currentLabel}</Badge></CardHeader>
    <CardContent className="pt-5"><ol>{steps.map((step, index) => <TimelineStep key={step[0]} step={step} index={index} activeIndex={activeIndex} history={history} />)}</ol></CardContent></Card>
  );
}

function TimelineHeading({ icon, title, destructive = false }: { icon?: ReactNode; title: string; destructive?: boolean }) {
  return <div className="flex items-center gap-3"><div className={cn("flex size-9 items-center justify-center rounded-lg", destructive ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary")}>{icon}</div><div><p className={cn("text-xs font-semibold uppercase tracking-[0.1em]", destructive ? "text-destructive" : "text-primary")}>Order Status</p><h2 className="font-semibold text-foreground">{title}</h2></div></div>;
}

function TimelineStep({ step, index, activeIndex, history }: { step: (typeof steps)[number]; index: number; activeIndex: number; history: OrderStatusHistory[] }) {
  const Icon = step[3];
  const complete = activeIndex > index;
  const current = activeIndex === index;
  const item = history.find((entry) => entry.status === step[0]);
  return <li className="relative flex gap-3 pb-5 last:pb-0">{index < steps.length - 1 ? <TimelineLine complete={complete} /> : null}<TimelineIcon Icon={Icon} current={current} complete={complete} /><div className="min-w-0 pt-0.5"><TimelineTitle title={step[1]} current={current} complete={complete} /><p className="mt-1 text-xs leading-5 text-muted-foreground">{item?.notes ?? step[2]}</p>{item ? <HistoryDate value={item.createdAt} /> : null}</div></li>;
}

function TimelineIcon({ Icon, current, complete }: { Icon: typeof Clock3; current: boolean; complete: boolean }) {
  return <div className={cn("relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border", current && "border-primary bg-primary text-primary-foreground", complete && !current && "border-border bg-accent text-primary", !current && !complete && "border-border bg-background text-muted-foreground")}><Icon className="size-4" /></div>;
}

function TimelineTitle({ title, current, complete }: { title: string; current: boolean; complete: boolean }) {
  return <div className="flex flex-wrap items-center gap-2"><h3 className={cn("text-sm font-semibold", !current && !complete && "text-muted-foreground")}>{title}</h3>{current ? <Badge variant="secondary" className="text-[10px]">Saat ini</Badge> : null}</div>;
}

function HistoryText({ item, fallback }: { item?: OrderStatusHistory; fallback: string }) {
  return <div><p className="text-sm text-muted-foreground">{item?.notes ?? fallback}</p>{item ? <HistoryDate value={item.createdAt} /> : null}</div>;
}

function HistoryDate({ value }: { value: string }) {
  return <p className="mt-1 text-[11px] text-muted-foreground">{new Date(value).toLocaleString("id-ID")}</p>;
}

function TimelineLine({ complete }: { complete: boolean }) {
  return <span className={cn("absolute left-[17px] top-9 h-[calc(100%-4px)] w-px", complete ? "bg-primary/60" : "bg-border")} aria-hidden="true" />;
}
