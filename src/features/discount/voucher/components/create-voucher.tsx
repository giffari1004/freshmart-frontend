import { useState } from "react";
import { useCreateVoucher } from "../hooks";
import { CREATE_VOUCHER } from "../schema";
import {
  VOUCHER_USAGE_TYPE,
  VOUCHER_VALUE_TYPE,
} from "@/features/discount/voucher/constant";
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
import { Product } from "@/features/product/constans";
import { createVoucherInput, createVoucherOutput } from "../schema";

export function CreateVoucher() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateVoucher();
  const form = useForm<createVoucherInput, any, createVoucherOutput>({
    resolver: zodResolver(CREATE_VOUCHER),
    defaultValues: {
      code: "",
      usageType: "CART_TOTAL",
      valueType: "PERCENTAGE",
      value: 0,
      isActive: true,
    },
  });
  const { data: productsData } = useGetAllProduct({
    page: 1,
    limit: 50,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  function onSubmitButton(value: createVoucherOutput) {
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
          Create voucher
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create voucher
          </DialogTitle>
          <p className="text-muted-foreground text-sm">Add a new voucher</p>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmitButton)}
          className="space-y-5 pt-2"
        >
          <div className="space-y-2">
            <Label htmlFor="code">Voucher code</Label>
            <Input
              id="code"
              className="h-12 rounded-2xl"
              placeholder="e.g. FRESH10"
              {...form.register("code")}
            />
            {form.formState.errors.code && (
              <p className="text-destructive text-xs">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Usage type</Label>
            <Select
              value={form.watch("usageType")}
              onValueChange={(value) =>
                form.setValue(
                  "usageType",
                  value as createVoucherOutput["usageType"],
                )
              }
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose usage type" />
              </SelectTrigger>
              <SelectContent>
                {VOUCHER_USAGE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {form.watch("usageType") === "PRODUCT_SPECIFIC" && (
            <div className="space-y-2">
              <Label>Product</Label>
              <Select
                value={form.watch("productId")}
                onValueChange={(value) => form.setValue("productId", value)}
              >
                <SelectTrigger className="w-full h-12 rounded-2xl">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {productsData?.data.map((product: Product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.productId && (
                <p className="text-destructive text-xs">
                  {form.formState.errors.productId.message}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label>Value type</Label>
            <Select
              value={form.watch("valueType")}
              onValueChange={(value) =>
                form.setValue(
                  "valueType",
                  value as createVoucherOutput["valueType"],
                )
              }
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose value type" />
              </SelectTrigger>
              <SelectContent>
                {VOUCHER_VALUE_TYPE.map((type) => (
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
            <Label htmlFor="maxDiscountAmount">
              Max discount amount (Optional)
            </Label>
            <PriceInput form={form} name="maxDiscountAmount" />
            {form.formState.errors.maxDiscountAmount && (
              <p className="text-destructive text-xs">
                {form.formState.errors.maxDiscountAmount.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPurchaseAmount">
              Min purchase amount (Optional)
            </Label>
            <PriceInput form={form} name="minPurchaseAmount" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiredAt">Expired at</Label>
            <Controller
              control={form.control}
              name="expiredAt"
              render={({ field }) => (
                <Input
                  id="expiredAt"
                  type="date"
                  className="h-12 rounded-2xl"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
            {form.formState.errors.expiredAt && (
              <p className="text-destructive text-xs">
                {form.formState.errors.expiredAt.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create voucher"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
