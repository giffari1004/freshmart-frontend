import { useDeleteDiscount } from "@/features/discount/direct/hooks";
import { Discount } from "@/features/discount/direct/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDiscountProps {
  discount: Discount | null;
  onClose: () => void;
}

export function DeleteDiscount({ discount, onClose }: DeleteDiscountProps) {
  const mutation = useDeleteDiscount();
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
            Are you sure you want to delete this discount for{" "}
            <span className="font-medium text-stone-900">
              {discount?.product.name}
            </span>
            ?
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
