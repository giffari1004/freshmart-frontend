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
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Delete voucher
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete voucher
            <span className="font-medium text-stone-900">{voucher?.code}</span>?
            This voucher will be deactivated.
          </p>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
