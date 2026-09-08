import { Controller, useForm } from "react-hook-form";
import { useUpdateMinPurchaseDiscount } from "@/features/discount/minimum-purchase/hooks";
import {
  MinPurchaseDiscount,
  UPDATE_MIN_PURCHASE_DISCOUNT,
  updateMinPurchaseInput,
  updateMinPurchaseOutput,
} from "@/features/discount/minimum-purchase/schema";
import { MIN_PURCHASE_VALUE_TYPE, minPurchaseValue } from "@/features/discount/minimum-purchase/constant";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceInput } from "@/lib/price-input";
import { Input } from "@/components/ui/input";
import { toDateInputValue } from "@/lib/to-date-input";
interface UpdateMinPurchaseDiscountProps {
  discount: MinPurchaseDiscount | null;
  onClose: () => void;
}
export function UpdateMinPurchaseDiscount({
  discount,
  onClose,
}: UpdateMinPurchaseDiscountProps) {
  const form = useForm<updateMinPurchaseInput, any, updateMinPurchaseOutput>({
    resolver: zodResolver(UPDATE_MIN_PURCHASE_DISCOUNT),
    defaultValues: {
      valueType: "PERCENTAGE",
      value: 0,
      minPurchaseAmount: 1000,
      maxDiscountAmount: undefined,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const valueType = form.watch("valueType");
  const isPercentage = valueType === "PERCENTAGE";
  const mutation = useUpdateMinPurchaseDiscount();
  useEffect(() => {
    if (discount) {
      form.reset(minPurchaseValue(discount));
    }
  }, [discount, form]);
  if (!discount) return null;
  const currentDiscount = discount;
  function onSubmit(value: updateMinPurchaseOutput) {
    mutation.mutate(
      { id: currentDiscount.id, body: value },
      { onSuccess: () => onClose() },
    );
  }
  return (
    <Dialog open={!!discount} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit discount
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the selected discount
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Value type</Label>
            <Select
              value={form.watch("valueType")}
              onValueChange={(value) =>
                form.setValue(
                  "valueType",
                  value as updateMinPurchaseOutput["valueType"],
                  { shouldValidate: true },
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
            {form.formState.errors.valueType && (
              <p className="text-destructive text-xs">
                {form.formState.errors.valueType.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <PriceInput
              form={form}
              name="value"
              prefix={isPercentage ? "" : "Rp "}
              suffix={isPercentage ? " %" : undefined}
              placeholder={isPercentage ? "0 %" : "Rp 0"}
            />
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
              Max discount amount (Opsional)
            </Label>
            <PriceInput form={form} name="maxDiscountAmount" />
            {form.formState.errors.maxDiscountAmount && (
              <p className="text-destructive text-xs">
                {form.formState.errors.maxDiscountAmount.message}
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
                  className="rounded-2xl h-12"
                  value={toDateInputValue(field.value)}
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
                  className="rounded-2xl h-12"
                  value={toDateInputValue(field.value)}
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
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium"
          >
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
