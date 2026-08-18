interface OrderStatusBadgeProps { status: string; }

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
      {status.replaceAll("_", " ")}
    </span>
  );
}
