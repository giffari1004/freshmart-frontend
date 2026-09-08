"use client";
import { Controller, useForm } from "react-hook-form";
import { useUpdateVoucher } from "../hooks";
import {
  defaultValueVoucher,
  VOUCHER_USAGE_TYPE,
  VOUCHER_VALUE_TYPE,
} from "@/features/discount/voucher/constant";
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
import { Input } from "@/components/ui/input";
import { PriceInput } from "@/lib/price-input";
import { useGetAllProduct } from "@/features/product/hooks";
import { Product } from "@/features/product/constans";
import { FormSelect } from "@/lib/form-select-helper";
import {
  UPDATE_VOUCHER,
  updateVoucherInput,
  updateVoucherOutput,
  Voucher,
} from "../schema";
import { toDateInputValue } from "@/lib/to-date-input";
interface UpdateVoucherProps {
  voucher: Voucher | null;
  onClose: () => void;
}
export function UpdateVoucher({ voucher, onClose }: UpdateVoucherProps) {
  const mutation = useUpdateVoucher();
  const form = useForm<updateVoucherInput, any, updateVoucherOutput>({
    resolver: zodResolver(UPDATE_VOUCHER),
    defaultValues: {
      code: "",
      usageType: "CART_TOTAL",
      valueType: "PERCENTAGE",
      value: 0,
      maxDiscountAmount: undefined,
      minPurchaseAmount: undefined,
      productId: undefined,
      expiredAt: new Date(),
      isActive: true,
    },
  });
  const { data: productsData } = useGetAllProduct({
    page: 1,
    limit: 50,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const valueType = form.watch("valueType");
  const isPercentage = valueType === "PERCENTAGE";
  useEffect(() => {
    if (voucher) {
      form.reset(defaultValueVoucher(voucher));
    }
  }, [voucher, form]);
  if (!voucher) return null;
  function onSubmit(value: updateVoucherOutput) {
    if (!voucher) return null;
    mutation.mutate(
      {
        id: voucher.id,
        body: value,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }
  return (
    <Dialog open={!!voucher} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-green-200 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit voucher
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the selected voucher
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
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
              suffix={isPercentage ? " %" : undefined}
              placeholder={isPercentage ? "0%" : "Rp 0"}
            />
            {form.formState.errors.value && (
              <p className="text-xs text-destructive">
                {form.formState.errors.value.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Max discount amount (Optional)</Label>
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
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
