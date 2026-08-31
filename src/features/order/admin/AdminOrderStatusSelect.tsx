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
  WAITING_CONFIRMATION: "PROCESSED",
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
      <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-400">
        No action
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => onChange(next)}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 px-3.5 text-xs font-black text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Updating..." : `Mark ${next}`}
      <ArrowRight className="size-3.5" />
    </button>
  );
}
