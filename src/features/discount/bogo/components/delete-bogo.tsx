import { useDeleteBogo } from "@/features/discount/bogo/hooks";
import { Bogo } from "@/features/discount/bogo/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[420px] rounded-3xl p-6 border-red-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">Delete BOGO</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this BOGO promo for{" "}
            <span className="font-medium text-stone-900">{bogo?.product.name}</span>?
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