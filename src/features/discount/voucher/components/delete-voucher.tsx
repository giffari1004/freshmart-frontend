import { useDeleteVoucher } from "../hooks";
import { Voucher } from "../schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteVoucherProps {
  voucher: Voucher | null;
  onClose: () => void;
}

export function DeleteVoucher({ voucher, onClose }: DeleteVoucherProps) {
  const mutation = useDeleteVoucher();
  function onConfirm() {
    if (!voucher) return;
    mutation.mutate(voucher.id, { onSuccess: () => onClose() });
  }

  return (
    <Dialog open={!!voucher} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl p-6 border-red-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Delete voucher
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete voucher{" "}
            <span className="font-medium text-stone-900">
              {voucher?.code}
            </span>
            ? This voucher will be deactivated.
          </p>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" className="rounded-2xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={mutation.isPending}
            className="rounded-2xl bg-red-600 hover:bg-red-700 text-white"
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}