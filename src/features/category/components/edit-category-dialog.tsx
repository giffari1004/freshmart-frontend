import { useEffect, useState } from "react";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { useForm } from "react-hook-form";
import {
  Category,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  updateCategorySchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface EditCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
}
export function UpdateCategoryDialog({
  category,
  onClose,
}: EditCategoryDialogProps) {
  const mutation = useUpdateCategory();
  const form = useForm<updateCategorySchema>({
    resolver: zodResolver(UPDATE_CATEGORY),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (category)
      form.reset({
        name: category.name,
      });
  }, [category, form]);
  if (!category) return null;
  const currentCategory = category;
  function onSubmit(value: updateCategorySchema) {
    mutation.mutate(
      { id: currentCategory.id, body: value },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }
  return (
    <Dialog open={!!category} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit category
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the selected category
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Category name
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              className="h-12 rounded-2xl"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
            >
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
