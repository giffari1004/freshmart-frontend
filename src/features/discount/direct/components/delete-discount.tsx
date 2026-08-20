import { useDeleteDiscount } from "@/features/discount/direct/hooks";
import { Discount } from "@/features/discount/direct/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[420px] rounded-3xl p-6 border-red-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">Delete discount</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this discount for{" "}
            <span className="font-medium text-stone-900">{discount?.product.name}</span>?
          </p>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" className="rounded-2xl" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} disabled={mutation.isPending} className="rounded-2xl bg-red-600 hover:bg-red-700 text-white">
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}