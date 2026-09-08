import { useDeleteBogo } from "@/features/discount/bogo/hooks";
import { Bogo } from "@/features/discount/bogo/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteBogoProps {
  bogo: Bogo | null;
  onClose: () => void;
}

export function DeleteBogo({ bogo, onClose }: DeleteBogoProps) {
  const mutation = useDeleteBogo();
  function onConfirm() {
    if (!bogo) return;
    mutation.mutate(bogo.id, { onSuccess: () => onClose() });
  }
  return (
    <Dialog open={!!bogo} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Delete BOGO
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this BOGO promo for{" "}
            <span className="font-medium text-stone-900">
              {bogo?.product.name}
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
