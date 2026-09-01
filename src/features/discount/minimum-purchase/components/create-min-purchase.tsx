import { useState } from "react";
import { useCreateMinPurchaseDiscount } from "@/features/discount/minimum-purchase/hooks";
import {
  CREATE_MIN_PURCHASE_DISCOUNT,
  createMinPurchaseInput,
  createMinPurchaseOutput,
} from "@/features/discount/minimum-purchase/schema";
import { MIN_PURCHASE_VALUE_TYPE } from "@/features/discount/minimum-purchase/constant";
import { useForm, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
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

const DUMMY_STORES = [
  { id: "1", name: "Toko Jakarta" },
  { id: "2", name: "Toko Bandung" },
];

export function CreateMinPurchaseDiscount() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateMinPurchaseDiscount();
  const form = useForm<createMinPurchaseInput, any, createMinPurchaseOutput>({
    resolver: zodResolver(CREATE_MIN_PURCHASE_DISCOUNT),
    defaultValues: {
      storeId: "",
      valueType: "PERCENTAGE",
      value: 0,
      minPurchaseAmount: 0,
    },
  });
  const { data: productsData } = useGetAllProduct({
    page: 1,
    limit: 50,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  function onSubmitButton(value: createMinPurchaseOutput) {
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
          Create discount Min Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create discount
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Add a minimum purchase discount
          </p>
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
            <Label>Product (Optional)</Label>
            <Select
              value={form.watch("productId")}
              onValueChange={(value) => form.setValue("productId", value)}
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Applies to all products if empty" />
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
            <Label>Value type</Label>
            <Select
              value={form.watch("valueType")}
              onValueChange={(value) =>
                form.setValue(
                  "valueType",
                  value as createMinPurchaseOutput["valueType"],
                )
              }
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose value type" />
              </SelectTrigger>
              <SelectContent>
                {MIN_PURCHASE_VALUE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <PriceInput form={form} name="value" />
            {form.formState.errors.value && (
              <p className="text-destructive text-xs">
                {form.formState.errors.value.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPurchaseAmount">Minimum purchase amount</Label>
            <PriceInput form={form} name="minPurchaseAmount" />
            {form.formState.errors.minPurchaseAmount && (
              <p className="text-destructive text-xs">
                {form.formState.errors.minPurchaseAmount.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDiscountAmount">
              Max discount amount (Optional)
            </Label>
            <PriceInput form={form} name="maxDiscountAmount" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <Input
                  id="startDate"
                  type="date"
                  className="h-12 rounded-2xl"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
            {form.formState.errors.startDate && (
              <p className="text-destructive text-xs">
                {form.formState.errors.startDate.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Controller
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <Input
                  id="endDate"
                  type="date"
                  className="h-12 rounded-2xl"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
            {form.formState.errors.endDate && (
              <p className="text-destructive text-xs">
                {form.formState.errors.endDate.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create discount"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
