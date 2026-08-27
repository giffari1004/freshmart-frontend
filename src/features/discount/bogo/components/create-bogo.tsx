import { useState } from "react";
import { useCreateBogo } from "@/features/discount/bogo/hooks";
import { CREATE_BOGO, createBogoInput, createBogoOutput } from "@/features/discount/bogo/schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllProduct } from "@/features/product/hooks";
import { Product } from "@/features/product/schema";

const DUMMY_STORES = [
  { id: "1", name: "Toko Jakarta" },
  { id: "2", name: "Toko Bandung" },
];

export function CreateBogo() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateBogo();
  const form = useForm<createBogoInput, any, createBogoOutput>({
    resolver: zodResolver(CREATE_BOGO),
    defaultValues: { storeId: "", productId: "" },
  });
  const { data: productsData } = useGetAllProduct({ page: 1, limit: 50, sortBy: "createdAt", sortOrder: "desc" });

  function onSubmitButton(value: createBogoOutput) {
    mutation.mutate(value, { onSuccess: () => { form.reset(); setOpen(false); } });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-full bg-green-800 px-6 text-sm font-semibold text-white shadow-sm hover:bg-green-700">Create BOGO</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">Create BOGO</DialogTitle>
          <p className="text-muted-foreground text-sm">Add a buy 1 get 1 promo</p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmitButton)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Store name</Label>
            <Select value={form.watch("storeId")} onValueChange={(value) => form.setValue("storeId", value)}>
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose store name" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_STORES.map((store) => (
                  <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Product name</Label>
            <Select value={form.watch("productId")} onValueChange={(value) => form.setValue("productId", value)}>
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Select product name" />
              </SelectTrigger>
              <SelectContent>
                {productsData?.data.map((product: Product) => (
                  <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <Input id="startDate" type="date" className="h-12 rounded-2xl" onChange={(e) => field.onChange(new Date(e.target.value))} />
              )}
            />
            {form.formState.errors.startDate && (
              <p className="text-destructive text-xs">{form.formState.errors.startDate.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Controller
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <Input id="endDate" type="date" className="h-12 rounded-2xl" onChange={(e) => field.onChange(new Date(e.target.value))} />
              )}
            />
            {form.formState.errors.endDate && (
              <p className="text-destructive text-xs">{form.formState.errors.endDate.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create BOGO"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}