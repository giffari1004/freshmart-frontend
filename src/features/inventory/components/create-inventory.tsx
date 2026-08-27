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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceInput } from "@/lib/price-input";
import { useGetAllProduct } from "@/features/product/hooks";
import { Product } from "@/features/product/schema";
//tunggu feature gifari selesai
const DUMMY_STORES = [
  { id: "1", name: "Toko Jakarta" },
  { id: "2", name: "Toko Bandung" },
];
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
  const { data: productsData } = useGetAllProduct({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  function onSubmitButton(value: createInventorySchema) {
    mutation.mutate(value, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-full bg-green-800 px-6 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          Create inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
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
            <Select
              value={form.watch("storeId")}
              onValueChange={(value) => form.setValue("storeId", value)}
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose store name" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_STORES.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Product name</Label>
            <Select
              value={form.watch("productId")}
              onValueChange={(value) => form.setValue("productId", value)}
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Select product name" />
              </SelectTrigger>
              <SelectContent>
                {productsData?.data.map((product: Product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Create price override (Optional)</Label>
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
