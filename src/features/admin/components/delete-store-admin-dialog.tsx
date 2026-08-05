import { useDeleteAdmins } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminUser } from "../schema";
interface DeleteStoreAdminProps {
  user: AdminUser | null;
  onClose: () => void;
}
export function DeleteStoreAdmin({ user, onClose }: DeleteStoreAdminProps) {
  const mutation = useDeleteAdmins(user?.id ?? "");
  function onConfirm() {
    mutation.mutate(undefined, {
      onSuccess: onClose,
    });
  }
  return (
    <Dialog open={!!user} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete store admin?</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete {user?.name} ({user?.email})? This
          account will be deactivated and won't be able to log in
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
