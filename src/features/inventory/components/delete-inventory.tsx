import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteInventory } from "../hooks";
import { Inventory } from "../schema";
import { Button } from "@/components/ui/button";

interface DeleteInventoryProps {
  inventory: Inventory | null;
  onClose: () => void;
}
export function DeleteInventory({ inventory, onClose }: DeleteInventoryProps) {
  if (!inventory) return null;
  const currentInventory = inventory;
  const mutation = useDeleteInventory();
  function handleConfirm() {
    mutation.mutate(currentInventory.id, { onSuccess: onClose });
  }
  return (
    <Dialog open={!!inventory} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete inventory</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Delete inventory , <b>{inventory?.product.name}</b> and
          <b>{inventory.store.name}</b>? , Products and storeId under this
          inventory won&apos;t be deleted, but you should reassign them first.
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
