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
import { PriceInput } from "@/lib/price-input";
import { useStores } from "@/features/store/hooks";
import { FormSelect } from "@/lib/form-select-helper";
import { Plus } from "lucide-react";
interface CreateMinPurchaseDiscountProps {
  isSuperAdmin: boolean;
}
export function CreateMinPurchaseDiscount({
  isSuperAdmin,
}: CreateMinPurchaseDiscountProps) {
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
  const valueType = form.watch("valueType");
  const isPercentage = valueType === "PERCENTAGE";
  const { data: storesData } = useStores({ page: 1, limit: 50 });
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
          <Plus className="h-4 w-4" /> Create discount Min Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-green-200 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create discount
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a minimum purchase discount
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
            <Label>Value type</Label>
            <FormSelect
              control={form.control}
              name="valueType"
              placeholder="Choose value type"
              items={MIN_PURCHASE_VALUE_TYPE.map((t) => ({
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
            <Label htmlFor="minPurchaseAmount">Minimum purchase amount</Label>
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
          {isPercentage && (
            <div className="space-y-2">
              <Label htmlFor="maxDiscountAmount">
                Max discount amount (Optional)
              </Label>
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
