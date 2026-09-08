import { useState } from "react";
import { useCreateInventory } from "@/features/inventory/hooks";
import {
  CREATE_INVENTORY,
  createInventorySchema,
} from "@/features/inventory/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PriceInput } from "@/lib/price-input";
import { FormComboBox } from "@/lib/form-combobox";
import { FormSelect } from "@/lib/form-select-helper";
import { useStores } from "@/features/store/hooks";
import { Plus } from "lucide-react";
export function CreateInventory() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateInventory();
  const form = useForm<createInventorySchema>({
    resolver: zodResolver(CREATE_INVENTORY),
    defaultValues: {
      storeId: "",
      productId: "",
      priceOverride: undefined,
    },
  });
  const { data: storesData } = useStores({ page: 1, limit: 50 });
  function onSubmitButton(value: createInventorySchema) {
    mutation.mutate(value, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  }
  const storeId = form.watch("storeId")
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-full bg-green-800 px-6 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Create inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create inventory
          </DialogTitle>
          <p className="text-muted-foreground text-sm">Add a new inventory</p>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmitButton)}
          className="space-y-5 pt-2"
        >
          <div className="space-y-2">
            <Label>Store name</Label>
            <FormSelect
              control={form.control}
              name="storeId"
              placeholder="Choose store name"
              items={
                storesData?.data.map((s) => ({ value: s.id, label: s.name })) ??
                []
              }
              error={form.formState.errors.storeId}
            />
          </div>
          <div className="space-y-2">
            <Label>Product name</Label>
            <FormComboBox
              control={form.control}
              name="productId"
              storeId={storeId}
              placeholder="Select product name"
            />
            {form.formState.errors.productId && (
              <p className="text-destructive text-xs">
                {form.formState.errors.productId.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceOverride">
              Create price override (Optional)
            </Label>
            <PriceInput form={form} name="priceOverride" />
            {form.formState.errors.priceOverride && (
              <p className="text-destructive text-xs">
                {form.formState.errors.priceOverride.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create inventory"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
