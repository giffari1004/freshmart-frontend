"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CREATE_PRODUCT,
  createProductInputSchema,
  createProductOutputSchema,
} from "../schema";
import { useCreateProduct } from "../hooks";
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
import { Textarea } from "@/components/ui/textarea";
import { NumberStepper } from "../../../lib/number-stepper";
import { PriceInput } from "../../../lib/price-input";
import { CategorySelect } from "./category-select";

function useCreateProductForm(onDone: () => void) {
  const form = useForm<
    createProductInputSchema,
    any,
    createProductOutputSchema
  >({
    resolver: zodResolver(CREATE_PRODUCT),
    defaultValues: {
      name: "",
      description: "",
      basePrice: 0,
      weight: undefined,
      categoryId: "",
      images: undefined,
    },
  });
  const mutation = useCreateProduct();
  function onSubmit(value: createProductOutputSchema) {
    const fd = new FormData();
    fd.append("name", value.name);
    fd.append("description", value.description ?? "");
    fd.append("basePrice", String(value.basePrice));
    fd.append("weight", String(value.weight));
    fd.append("categoryId", value.categoryId);
    Array.from(value.images as FileList).forEach((file) => {
      fd.append("images", file);
    });
    mutation.mutate(fd, {
      onSuccess: () => {
        form.reset();
        onDone();
      },
    });
  }
  return { form, onSubmit, isPending: mutation.isPending };
}
export function CreateProduct() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isPending } = useCreateProductForm(() =>
    setOpen(false),
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-full bg-green-800 px-6 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          Create product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create product
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Add a new product for your store
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Product name
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              className="h-12 rounded-2xl"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}

            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              className="min-h-28 rounded-2xl"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}

            <Label htmlFor="basePrice" className="text-sm font-medium">
              Base Price
            </Label>
            <PriceInput form={form} name="basePrice" />
            {form.formState.errors.basePrice && (
              <p className="text-xs text-destructive">
                {form.formState.errors.basePrice.message}
              </p>
            )}

            <Label htmlFor="weight" className="text-sm font-medium">
              Weight
            </Label>
            <NumberStepper form={form} name="weight" min={0} />
            {form.formState.errors.weight && (
              <p className="text-xs text-destructive">
                {form.formState.errors.weight.message}
              </p>
            )}

            <Label className="text-sm font-medium">Category</Label>
            <CategorySelect form={form} name="categoryId" />
            {form.formState.errors.categoryId && (
              <p className="text-xs text-destructive">
                {form.formState.errors.categoryId.message}
              </p>
            )}
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              multiple
              onChange={(e) => form.setValue("images", e.target.files)}
            />
            {form.formState.errors.images && (
              <p className="text-xs text-destructive">
                {String(form.formState.errors.images.message)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {isPending ? "Creating..." : "Create product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
