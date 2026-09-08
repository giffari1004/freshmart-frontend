import { useDeleteMinPurchaseDiscount } from "@/features/discount/minimum-purchase/hooks";
import { MinPurchaseDiscount } from "@/features/discount/minimum-purchase/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteMinPurchaseDiscountProps {
  discount: MinPurchaseDiscount | null;
  onClose: () => void;
}

export function DeleteMinPurchaseDiscount({
  discount,
  onClose,
}: DeleteMinPurchaseDiscountProps) {
  const mutation = useDeleteMinPurchaseDiscount();
  function onConfirm() {
    if (!discount) return;
    mutation.mutate(discount.id, { onSuccess: () => onClose() });
  }
  return (
    <Dialog open={!!discount} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Delete discount
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this discount
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
