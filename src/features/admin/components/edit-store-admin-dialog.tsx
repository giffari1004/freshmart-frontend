import { useForm } from "react-hook-form";
import {
  AdminUser,
  UPDATE_STORE_ADMIN,
  updateStoreAdminSchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAdmins } from "../hooks";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface EditStoreAdminProps {
  user: AdminUser | null;
  onClose: () => void;
}
export function EditStoreAdmin({ user, onClose }: EditStoreAdminProps) {
  const mutation = useUpdateAdmins();
  const form = useForm<updateStoreAdminSchema>({
    resolver: zodResolver(UPDATE_STORE_ADMIN),
    defaultValues: {
      name: "",
      storeId: "",
    },
  });
  useEffect(() => {
    if (user) form.reset({ name: user.name, storeId: user.storeId ?? "" });
  }, [user, form]);
  if (!user) return null;
  const currentUser = user;
  function onSubmit(value: updateStoreAdminSchema) {
    mutation.mutate(
      { id: currentUser.id, body: value },
      {
        onSuccess: onClose,
      },
    );
  }
  return (
    <Dialog open={!!user} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {user?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="storeId">Store ID</Label>
            <Input id="storeId" {...form.register("storeId")} />
            {form.formState.errors.storeId && (
              <p className="text-xs text-destructive">
                {form.formState.errors.storeId?.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
            >
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
