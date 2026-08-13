import { useGetAllCategory } from "@/features/category/hooks";
import { useUpdateProduct } from "../hooks";
import {
  Product,
  UPDATE_PRODUCT,
  updateProductInputSchema,
  updateProductOutputSchema,
} from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NumberStepper } from "../../../lib/number-stepper";
import { CategorySelect } from "./category-select";
import { PriceInput } from "../../../lib/price-input";
interface EditProductProps {
  product: Product | null;
  onClose: () => void;
}
export function UpdateProduct({ product, onClose }: EditProductProps) {
  const mutation = useUpdateProduct();
  const { data: categoryData } = useGetAllCategory({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });
  const form = useForm<
    updateProductInputSchema,
    any,
    updateProductOutputSchema
  >({
    resolver: zodResolver(UPDATE_PRODUCT),
    defaultValues: {
      name: "",
      description: "",
      basePrice: undefined,
      weight: undefined,
      categoryId: "",
    },
  });
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description ?? "",
        basePrice: product.basePrice,
        weight: product.weight,
        categoryId: product.categoryId,
      });
    }
  }, [product, form]);
  if (!product) return null;
  const currentProduct = product;
  function onSubmit(value: updateProductOutputSchema) {
    mutation.mutate(
      {
        id: currentProduct.id,
        body: value,
      },
      {
        onSuccess: onClose,
      },
    );
  }
  return (
    <Dialog open={!!product} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm: max-w-[560px] rounded-3xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">Edit product</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the selected product information
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Product name</Label>
            <Input
              id="edit-name"
              className="h-12 rounded-2xl"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              className="min-h-28 rounded-2xl"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-basePrice">Base price</Label>
              <PriceInput form={form} name={"basePrice"} />
              {form.formState.errors.basePrice && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.basePrice.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-weight">Weight (g)</Label>
              <NumberStepper form={form} name="weight" min={0} />
              {form.formState.errors.weight && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.weight.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <CategorySelect form={form} name="categoryId" />
            {form.formState.errors.categoryId && (
              <p className="text-xs text-destructive">
                {form.formState.errors.categoryId.message}
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
