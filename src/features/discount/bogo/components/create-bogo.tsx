"use client";

import { useEffect, useState } from "react";
import { useCreateBogo, useGetAllBogo } from "@/features/discount/bogo/hooks";
import {
  Bogo,
  CREATE_BOGO,
  createBogoInput,
  createBogoOutput,
} from "@/features/discount/bogo/schema";
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
import { Product } from "@/features/product/constans";
import { FormSelect } from "@/lib/form-select-helper";
import { Plus } from "lucide-react";
import { useGetAllInventories } from "@/features/inventory/hooks";
import { Inventory } from "@/features/inventory/schema";
import { useStores } from "@/features/store/hooks";
import { DiscountProductComboBox } from "@/lib/discount-combobox";

interface CreateBogoProps {
  isSuperAdmin: boolean;
}

export function CreateBogo({ isSuperAdmin }: CreateBogoProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateBogo();
  const form = useForm<createBogoInput, any, createBogoOutput>({
    resolver: zodResolver(CREATE_BOGO),
    defaultValues: { storeId: "", productId: "" },
  });
  const storeId = form.watch("storeId");
  const { data: inventoryData } = useGetAllInventories({
    page: 1,
    limit: 20,
    storeId,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data: activeBOGOData } = useGetAllBogo({
    page: 1,
    limit: 20,
    storeId,
  });
  const bogoProduct = new Set(
    activeBOGOData?.data.map((b: Bogo) => b.productId) ?? [],
  );
  const availableProducts = inventoryData?.data
    .map((inv: Inventory) => inv.product)
    .filter((product: Product) => !bogoProduct.has(product.id)) ?? [];
  const { data: storesData } = useStores({ page: 1, limit: 20 });
  useEffect(() => {
    form.setValue("productId", "");
  }, [storeId, form]);
  function onSubmitButton(value: createBogoOutput) {
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
          <Plus className="h-4 w-4" /> Create BOGO
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-green-200 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create BOGO
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a buy 1 get 1 promo
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
            <DiscountProductComboBox
            products={availableProducts}
            productId={form.watch("productId")}
            onProductIdChange={(v) => form.setValue("productId" , v ?? "" , {shouldValidate:true})}
            />
            {form.formState.errors.productId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.productId.message}
              </p>
            )}
            </div>
          <div className="space-y-2">
            <Label>Start date</Label>
            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <Input
                  type="date"
                  className="h-12 rounded-2xl"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>End date</Label>
            <Controller
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <Input
                  type="date"
                  className="h-12 rounded-2xl"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full rounded-2xl bg-green-700 text-white hover:bg-green-800"
          >
            {mutation.isPending ? "Creating..." : "Create BOGO"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

