import { useState } from "react";
import { useCreateCategory } from "../hooks";
import { useForm } from "react-hook-form";
import { CREATE_CATEGORY, createCategorySchema } from "../schema";
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
export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateCategory();
  const form = useForm<createCategorySchema>({
    resolver: zodResolver(CREATE_CATEGORY),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(value: createCategorySchema) {
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
          Create category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create category
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Add a new category for your store products
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
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-sm"
          >
            {mutation.isPending ? "Creating..." : "Create category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
