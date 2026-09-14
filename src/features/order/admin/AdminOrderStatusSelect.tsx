import { ArrowRight, XCircle } from "lucide-react";
import type { AdminOrderActionStatus, AdminOrderStatus } from "./order-admin.type";

interface Props {
  status: AdminOrderStatus;
  isPending: boolean;
  onChange: (status: AdminOrderActionStatus) => void;
}

const nextStatuses: Partial<Record<AdminOrderStatus, AdminOrderActionStatus[]>> = {
  PAID: ["PROCESSED", "CANCELLED"],
  PROCESSED: ["SHIPPED", "CANCELLED"],
};

export function AdminOrderStatusSelect({ status, isPending, onChange }: Props) {
  const next = nextStatuses[status] ?? [];
  if (!next.length) return <NoAction />;
  return <div className="flex flex-wrap gap-2">{next.map((value) => <StatusAction key={value} value={value} isPending={isPending} onClick={() => onChange(value)} />)}</div>;
}

function StatusAction({ value, isPending, onClick }: { value: AdminOrderActionStatus; isPending: boolean; onClick: () => void }) {
  const cancel = value === "CANCELLED";
  return <button type="button" disabled={isPending} onClick={onClick} className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-accent px-3.5 text-xs font-black text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50">{isPending ? "Updating..." : `${cancel ? "Cancel" : "Mark"} ${value}`}{cancel ? <XCircle className="size-3.5" /> : <ArrowRight className="size-3.5" />}</button>;
}

function NoAction() {
  return <span className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground">No action</span>;
}
