"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useCreateVoucher } from "../hooks";
import {
  CREATE_VOUCHER,
  createVoucherInput,
  createVoucherOutput,
} from "../schema";
import {
  VOUCHER_USAGE_TYPE,
  VOUCHER_VALUE_TYPE,
} from "@/features/discount/voucher/constant";
import { useGetAllProduct } from "@/features/product/hooks";
import { useStores } from "@/features/store/hooks";
import { Product } from "@/features/product/constans";
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
import { FormSelect } from "@/lib/form-select-helper";
import { toDateInputValue } from "@/lib/to-date-input";
interface CreateVoucherProps {
  isSuperAdmin: boolean;
}
export function CreateVoucher({ isSuperAdmin }: CreateVoucherProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateVoucher();
  const form = useForm<createVoucherInput, any, createVoucherOutput>({
    resolver: zodResolver(CREATE_VOUCHER),
    defaultValues: {
      storeId: undefined,
      code: "",
      usageType: "CART_TOTAL",
      valueType: "PERCENTAGE",
      value: 0,
      maxDiscountAmount: undefined,
      minPurchaseAmount: undefined,
      productId: undefined,
      expiredAt: undefined,
      isActive: true,
    },
  });
  const { data: productsData } = useGetAllProduct({
    page: 1,
    limit: 50,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data: storesData } = useStores({ page: 1, limit: 50 });
  const valueType = form.watch("valueType");
  const isPercentage = valueType === "PERCENTAGE";
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
        <Button className="h-11 rounded-full bg-green-800 px-6 text-sm font-semibold text-white hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Create voucher
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-green-200 p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Create voucher
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Add a new voucher</p>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmitButton)}
          className="space-y-5 pt-2"
        >
          {isSuperAdmin && (
            <div className="space-y-2">
              <Label>Store</Label>
              <FormSelect
                control={form.control}
                name="storeId"
                placeholder="Select store"
                items={
                  storesData?.data.map((store) => ({
                    value: store.id,
                    label: store.name,
                  })) ?? []
                }
                error={form.formState.errors.storeId}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Voucher code</Label>
            <Input
              className="h-12 rounded-2xl"
              placeholder="e.g. FRESH10"
              {...form.register("code")}
            />
            {form.formState.errors.code && (
              <p className="text-xs text-destructive">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Usage type</Label>
            <FormSelect
              control={form.control}
              name="usageType"
              placeholder="Choose usage type"
              items={VOUCHER_USAGE_TYPE.map((item) => ({
                value: item,
                label: item.replace("_", " "),
              }))}
              error={form.formState.errors.usageType}
            />
          </div>
          {form.watch("usageType") === "PRODUCT_SPECIFIC" && (
            <div className="space-y-2">
              <Label>Product</Label>
              <FormSelect
                control={form.control}
                name="productId"
                placeholder="Select product"
                items={
                  productsData?.data.map((p: Product) => ({
                    value: p.id,
                    label: p.name,
                  })) ?? []
                }
                error={form.formState.errors.productId}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Value type</Label>
            <FormSelect
              control={form.control}
              name="valueType"
              placeholder="Choose value type"
              items={VOUCHER_VALUE_TYPE.map((item) => ({
                value: item,
                label: item,
              }))}
              error={form.formState.errors.valueType}
            />
          </div>
          <div className="space-y-2">
            <Label>Value</Label>
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
          {isPercentage && (
            <div className="space-y-2">
              <Label>Max discount amount</Label>
              <PriceInput
                form={form}
                name="maxDiscountAmount"
                prefix="Rp "
                placeholder="Rp 0"
              />
              {form.formState.errors.maxDiscountAmount && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.maxDiscountAmount.message}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label>Min purchase amount (Optional)</Label>
            <PriceInput
              form={form}
              name="minPurchaseAmount"
              prefix="Rp "
              placeholder="Rp 0"
            />
            {form.formState.errors.minPurchaseAmount && (
              <p className="text-xs text-destructive">
                {form.formState.errors.minPurchaseAmount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Expired at</Label>
            <Controller
              control={form.control}
              name="expiredAt"
              render={({ field }) => (
                <Input
                  type="date"
                  className="h-12 rounded-2xl"
                  value={toDateInputValue(field.value)}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
            {form.formState.errors.expiredAt && (
              <p className="text-xs text-destructive">
                {form.formState.errors.expiredAt.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full rounded-2xl bg-green-700 font-medium text-white hover:bg-green-800"
          >
            {mutation.isPending ? "Creating..." : "Create voucher"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
