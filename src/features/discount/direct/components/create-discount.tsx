import { useEffect, useState } from "react";
import {
  useCreateDiscount,
  useGetAllDiscounts,
} from "@/features/discount/direct/hooks";
import {
  CREATE_DISCOUNT,
  createDiscountInput,
  createDiscountOutput,
  Discount,
} from "@/features/discount/direct/schema";
import { DISCOUNT_VALUE_TYPE } from "@/features/discount/direct/constant";
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
import { PriceInput } from "@/lib/price-input";
import { Product } from "@/features/product/constans";
import { useStores } from "@/features/store/hooks";
import { FormSelect } from "@/lib/form-select-helper";
import { Plus } from "lucide-react";
import { useGetAllInventories } from "@/features/inventory/hooks";
import { Inventory } from "@/features/inventory/schema";
interface CreateDiscountProps {
  isSuperAdmin: boolean;
}
export function CreateDiscount({ isSuperAdmin }: CreateDiscountProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateDiscount();
  const form = useForm<createDiscountInput, any, createDiscountOutput>({
    resolver: zodResolver(CREATE_DISCOUNT),
    defaultValues: {
      storeId: "",
      productId: "",
      valueType: "PERCENTAGE",
      value: undefined,
    },
  });
  const storeId = form.watch("storeId");
  const valueType = form.watch("valueType");
  const isPercentage = valueType === "PERCENTAGE";
  useEffect(() => {
    form.setValue("productId", "");
  }, [storeId, form]);
  const { data: inventoryData } = useGetAllInventories({
    page: 1,
    limit: 50,
    storeId,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data: activeDiscountsData } = useGetAllDiscounts({
    page: 1,
    limit: 50,
    storeId,
  });
  const { data: storesData } = useStores({ page: 1, limit: 50 });
  const discountProduct = new Set(
    activeDiscountsData?.data?.map((d: Discount) => d.productId) ?? [],
  );
  const availableProducts = inventoryData?.data
    .map((inv: Inventory) => inv.product)
    .filter((product: Product) => !discountProduct.has(product.id));
  function onSubmitButton(value: createDiscountOutput) {
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
          <Plus className="h-4 w-4" /> Create direct discount
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-green-200 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create discount
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a direct discount to a product
          </p>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmitButton)}
          className="space-y-5 pt-2"
        >
          {isSuperAdmin && (
            <div className="space-y-2">
              <Label>Store name</Label>
              <FormSelect
                control={form.control}
                name="storeId"
                placeholder="Choose store name"
                items={
                  storesData?.data.map((s) => ({
                    value: s.id,
                    label: s.name,
                  })) ?? []
                }
                error={form.formState.errors.storeId}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Product name</Label>
            <FormSelect
              control={form.control}
              name="productId"
              placeholder="Select product name"
              items={
                availableProducts?.map((p: Product) => ({
                  value: p.id,
                  label: p.name,
                })) ?? []
              }
              error={form.formState.errors.productId}
            />
          </div>
          <div className="space-y-2">
            <Label>Value type</Label>
            <FormSelect
              control={form.control}
              name="valueType"
              placeholder="Choose value type"
              items={DISCOUNT_VALUE_TYPE.map((t) => ({
                value: t,
                label: t,
              }))}
              error={form.formState.errors.valueType}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <PriceInput
              form={form}
              name="value"
              prefix={isPercentage ? "" : "Rp "}
              suffix={isPercentage ? "%" : undefined}
              placeholder={isPercentage ? "0%" : "Rp 0"}
            />
            {form.formState.errors.value && (
              <p className="text-xs text-destructive">
                {form.formState.errors.value.message}
              </p>
            )}
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
              <p className="text-xs text-destructive">
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
              <p className="text-xs text-destructive">
                {form.formState.errors.endDate.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full rounded-2xl bg-green-700 font-medium text-white shadow-sm hover:bg-green-800"
          >
            {mutation.isPending ? "Creating..." : "Create discount"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}