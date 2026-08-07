"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "../schema";
import { useDeleteCategory } from "../hooks";
interface DeleteCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
}
export function DeleteCategoryDialog({
  category,
  onClose,
}: DeleteCategoryDialogProps) {
  const mutation = useDeleteCategory();
  if (!category) return null;
  const currentCategory = category;
  function handleConfirm() {
    mutation.mutate(currentCategory.id, { onSuccess: onClose });
  }
  return (
    <Dialog open={!!category} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Delete <b>{category?.name}</b>? Products under this category
          won&apos;t be deleted, but you should reassign them first.
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
