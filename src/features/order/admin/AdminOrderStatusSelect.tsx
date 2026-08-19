import { AdminOrderActionStatus, AdminOrderStatus } from "./order-admin.type";

interface Props {
  status: AdminOrderStatus;
  isPending: boolean;
  onChange: (status: AdminOrderActionStatus) => void;
}

const nextStatus: Partial<Record<AdminOrderStatus, AdminOrderActionStatus>> = {
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
    return <span className="text-xs text-stone-400">No action</span>;
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => onChange(next)}
      className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-50"
    >
      {isPending ? "Updating..." : `Mark ${next}`}
    </button>
  );
}
