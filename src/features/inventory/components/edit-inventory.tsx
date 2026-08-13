import { useForm } from "react-hook-form";
import { useUpdateInventory } from "../hooks";
import { Inventory, UPDATE_INVENTORY, updateInventorySchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PriceInput } from "@/lib/price-input";
interface UpdateInventoryProps {
  inventory: Inventory | null;
  onClose: () => void;
}
export function UpdateInventory({ inventory, onClose }: UpdateInventoryProps) {
  const form = useForm<updateInventorySchema>({
    resolver: zodResolver(UPDATE_INVENTORY),
    defaultValues: {
      priceOverride: undefined,
    },
  });
  useEffect(() => {
    if (inventory) {
      form.reset({
        priceOverride: inventory.priceOverride ?? undefined,
      });
    }
  }, [inventory, form]);
  if (!inventory) return null;
  const currentInventory = inventory;
  const mutation = useUpdateInventory();
  function onSubmit(value: updateInventorySchema) {
    mutation.mutate(
      {
        id: currentInventory.id,
        body: value,
      },
      { onSuccess: () => onClose() },
    );
  }
  return (
    <Dialog open={!!inventory} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit inventory
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the selected inventory
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Product price override
            </Label>
            <PriceInput form={form} name="priceOverride"/>
            {form.formState.errors.priceOverride && (
              <p className="text-xs text-destructive">
                {form.formState.errors.priceOverride.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium"
          >
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
