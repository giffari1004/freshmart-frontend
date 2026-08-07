import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategory } from "@/features/category/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/features/category/schema";

export function CreateProduct() {
  const [open, setOpen] = useState(false);
  const form = useForm<
    createProductInputSchema,
    any,
    createProductOutputSchema
  >({
    resolver: zodResolver(CREATE_PRODUCT),
    defaultValues: {
      name: "",
      description: "",
      basePrice: undefined,
      weight: undefined,
      categoryId: "",
      images: undefined,
    },
  });
  const mutation = useCreateProduct();
  const { data: categoryData } = useGetAllCategory({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });
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
        setOpen(false);
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          Create product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
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
            <Input
              id="basePrice"
              type="number"
              placeholder="Enter product base price"
              className="h-12 rounded-2xl"
              {...form.register("basePrice")}
            />
            {form.formState.errors.basePrice && (
              <p className="text-xs text-destructive">
                {form.formState.errors.basePrice.message}
              </p>
            )}
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter product weight"
              className="h-12 rounded-2xl"
              {...form.register("weight")}
            />
            {form.formState.errors.weight && (
              <p className="text-xs text-destructive">
                {form.formState.errors.weight.message}
              </p>
            )}
            <Select
              value={form.watch("categoryId") || undefined}
              onValueChange={(value) => form.setValue("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryData?.data.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
