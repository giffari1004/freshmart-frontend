import { useDeleteMinPurchaseDiscount } from "@/features/discount/minimum-purchase/hooks";
import { MinPurchaseDiscount } from "@/features/discount/minimum-purchase/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteMinPurchaseDiscountProps {
  discount: MinPurchaseDiscount | null;
  onClose: () => void;
}

export function DeleteMinPurchaseDiscount({ discount, onClose }: DeleteMinPurchaseDiscountProps) {
  const mutation = useDeleteMinPurchaseDiscount();
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
            Are you sure you want to delete this discount
            {discount?.product ? ` for ${discount.product.name}` : ""}?
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