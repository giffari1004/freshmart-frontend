import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminOrderActionStatus } from "./order-admin.type";

interface Props {
  action: { id: string; status: AdminOrderActionStatus } | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AdminOrderStatusDialog({
  action,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={Boolean(action)} onOpenChange={(open) => !open && !isPending && onClose()}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Change order status?</DialogTitle>
          <DialogDescription>{getDescription(action)}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>Keep Order</Button>
          <Button onClick={onConfirm} disabled={isPending}>{isPending ? "Updating..." : "Confirm"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getDescription(action: Props["action"]) {
  if (!action) return "";
  return `The order will move to ${action.status.replaceAll("_", " ")}. Confirm to continue.`;
}
