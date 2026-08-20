import { useForm } from "react-hook-form";
import { useUpdateVoucher } from "../hooks";
import { Voucher, UPDATE_VOUCHER } from "../schema";
import { updateVoucherInput , updateVoucherOutput } from "../schema";
import { VOUCHER_USAGE_TYPE, VOUCHER_VALUE_TYPE } from "../constant";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateVoucherProps {
  voucher: Voucher | null;
  onClose: () => void;
}

export function UpdateVoucher({ voucher, onClose }: UpdateVoucherProps) {
  const form = useForm<updateVoucherInput,any,updateVoucherOutput>({
    resolver: zodResolver(UPDATE_VOUCHER),
    defaultValues: {
      code: undefined,
      usageType: undefined,
      valueType: undefined,
      value: undefined,
      maxDiscountAmount: undefined,
      minPurchaseAmount: undefined,
      expiredAt: undefined,
      isActive: undefined,
    },
  });
  useEffect(() => {
    if (voucher) {
      form.reset({
        code: voucher.code,
        usageType: voucher.usageType,
        valueType: voucher.valueType,
        value: voucher.value,
        maxDiscountAmount: voucher.maxDiscountAmount ?? undefined,
        minPurchaseAmount: voucher.minPurchaseAmount ?? undefined,
        expiredAt: new Date(voucher.expiredAt),
        isActive: voucher.isActive,
      });
    }
  }, [voucher, form]);
  if (!voucher) return null;
  const currentVoucher = voucher;
  const mutation = useUpdateVoucher();
  function onSubmit(value: updateVoucherOutput) {
    mutation.mutate(
      {
        id: currentVoucher.id,
        body: value,
      },
      { onSuccess: () => onClose() },
    );
  }

  return (
    <Dialog open={!!voucher} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit voucher
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the selected voucher
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-medium">
              Voucher code
            </Label>
            <Input id="code" {...form.register("code")} />
            {form.formState.errors.code && (
              <p className="text-xs text-destructive">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Usage type</Label>
            <Select
              value={form.watch("usageType")}
              onValueChange={(val) =>
                form.setValue("usageType", val as (typeof VOUCHER_USAGE_TYPE)[number])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select usage type" />
              </SelectTrigger>
              <SelectContent>
                {VOUCHER_USAGE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.usageType && (
              <p className="text-xs text-destructive">
                {form.formState.errors.usageType.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Value type</Label>
            <Select
              value={form.watch("valueType")}
              onValueChange={(val) =>
                form.setValue("valueType", val as (typeof VOUCHER_VALUE_TYPE)[number])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select value type" />
              </SelectTrigger>
              <SelectContent>
                {VOUCHER_VALUE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.valueType && (
              <p className="text-xs text-destructive">
                {form.formState.errors.valueType.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="value" className="text-sm font-medium">
              Value
            </Label>
            <Input
              id="value"
              type="number"
              {...form.register("value", { valueAsNumber: true })}
            />
            {form.formState.errors.value && (
              <p className="text-xs text-destructive">
                {form.formState.errors.value.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDiscountAmount" className="text-sm font-medium">
              Max discount amount
            </Label>
            <Input
              id="maxDiscountAmount"
              type="number"
              {...form.register("maxDiscountAmount", { valueAsNumber: true })}
            />
            {form.formState.errors.maxDiscountAmount && (
              <p className="text-xs text-destructive">
                {form.formState.errors.maxDiscountAmount.message}
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