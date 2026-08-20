import { useForm } from "react-hook-form";
import { useUpdateMinPurchaseDiscount } from "@/features/discount/minimum-purchase/hooks";
import { MinPurchaseDiscount, UPDATE_MIN_PURCHASE_DISCOUNT, updateMinPurchaseInput, updateMinPurchaseOutput } from "@/features/discount/minimum-purchase/schema";
import { MIN_PURCHASE_VALUE_TYPE } from "@/features/discount/minimum-purchase/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PriceInput } from "@/lib/price-input";

interface UpdateMinPurchaseDiscountProps {
  discount: MinPurchaseDiscount | null;
  onClose: () => void;
}
export function UpdateMinPurchaseDiscount({ discount, onClose }: UpdateMinPurchaseDiscountProps) {
  const form = useForm<updateMinPurchaseInput,any,updateMinPurchaseOutput>({
    resolver: zodResolver(UPDATE_MIN_PURCHASE_DISCOUNT),
  });
  useEffect(() => {
    if (discount) {
      form.reset({
        valueType: discount.valueType,
        value: discount.value,
        minPurchaseAmount: discount.minPurchaseAmount,
        maxDiscountAmount: discount.maxDiscountAmount ?? undefined,
      });
    }
  }, [discount, form]);
  if (!discount) return null;
  const currentDiscount = discount;
  const mutation = useUpdateMinPurchaseDiscount();
  function onSubmit(value: updateMinPurchaseOutput) {
    mutation.mutate({ id: currentDiscount.id, body: value }, { onSuccess: () => onClose() });
  }
  return (
    <Dialog open={!!discount} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">Edit discount</DialogTitle>
          <p className="text-muted-foreground text-sm">Update the selected discount</p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Value type</Label>
            <Select
              value={form.watch("valueType")}
              onValueChange={(value) => form.setValue("valueType", value as updateMinPurchaseOutput["valueType"])}
            >
              <SelectTrigger className="w-full h-12 rounded-2xl">
                <SelectValue placeholder="Choose value type" />
              </SelectTrigger>
              <SelectContent>
                {MIN_PURCHASE_VALUE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <PriceInput form={form} name="value" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPurchaseAmount">Minimum purchase amount</Label>
            <PriceInput form={form} name="minPurchaseAmount" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDiscountAmount">Max discount amount</Label>
            <PriceInput form={form} name="maxDiscountAmount" />
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