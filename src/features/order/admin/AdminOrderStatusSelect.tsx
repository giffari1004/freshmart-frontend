import { ArrowRight } from "lucide-react";
import type {
  AdminOrderActionStatus,
  AdminOrderStatus,
} from "./order-admin.type";

interface Props {
  status: AdminOrderStatus;
  isPending: boolean;
  onChange: (status: AdminOrderActionStatus) => void;
}

const nextStatus: Partial<
  Record<AdminOrderStatus, AdminOrderActionStatus>
> = {
  PAID: "PROCESSED",
  PROCESSED: "SHIPPED",
};

export function AdminOrderStatusSelect({
  status,
  isPending,
  onChange,
}: Props) {
  const next = nextStatus[status];

  if (!next) {
    return (
      <span className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground">
        No action
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => onChange(next)}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-gradient-to-r from-accent to-accent px-3.5 text-xs font-black text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-border hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Updating..." : `Mark ${next}`}
      <ArrowRight className="size-3.5" />
    </button>
  );
}
