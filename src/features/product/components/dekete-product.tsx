import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "../hooks";
import { Product } from "../constans";
import { Button } from "@/components/ui/button";

interface DeleteProductProps {
  product: Product | null;
  onClose: () => void;
}
export function DeleteProduct({
  product,
  onClose,
}: DeleteProductProps) {
  const mutation = useDeleteProduct();
  if (!product) return null;
  const currentProduct = product;
  function handleConfirm() {
    mutation.mutate(currentProduct.id, {
      onSuccess: onClose,
    });
  }
  return (
    <Dialog open={!!product} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete product</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <b>{product?.name}</b>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={mutation.isPending}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
