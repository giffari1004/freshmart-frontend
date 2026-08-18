interface Props {
  canConfirm: boolean;
  isPending: boolean;
  onConfirm: () => void;
}

export function OrderConfirmButton({
  canConfirm,
  isPending,
  onConfirm,
}: Props) {
  if (!canConfirm) return null;

  return (
    <button
      type="button"
      onClick={onConfirm}
      disabled={isPending}
      className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50"
    >
      {isPending ? "Confirming..." : "Confirm Order Received"}
    </button>
  );
}
