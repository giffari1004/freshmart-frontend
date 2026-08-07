"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_STORE_ADMIN, createStoreAdminSchema } from "../schema";
import { useCreateAdmins } from "../hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
export function CreateStoreAdmin() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateAdmins();
  const form = useForm<createStoreAdminSchema>({
    resolver: zodResolver(CREATE_STORE_ADMIN),
    defaultValues: { name: "", email: "", password: "", storeId: "" },
  });
  function onSubmit(value: createStoreAdminSchema) {
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
          <span className="mr-2 text-base">+</span> Add store admin
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border border-green-100 bg-white p-6 shadow-2xl sm:max-w-md">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold text-stone-900">
            Add store admin
          </DialogTitle>
          <p className="text-sm text-stone-500">
            Create a new admin account for your store
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <input
              id="name"
              placeholder="Your Name"
              {...form.register("name")}
              className="h-11 w-full rounded-xl border border-stone-200 bg-green-50/40 px-3 text-sm outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              {...form.register("email")}
              className="h-11 w-full rounded-xl border border-stone-200 bg-green-50/40 px-3 text-sm outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              {...form.register("password")}
              className="h-11 w-full rounded-xl border border-stone-200 bg-green-50/40 px-3 text-sm outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-destructive">
                {form.formState.errors.password?.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="storeId">Store ID</Label>
            <input
              id="storeId"
              placeholder="Store ID"
              {...form.register("storeId")}
              className="h-11 w-full rounded-xl border border-stone-200 bg-green-50/40 px-3 text-sm outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
            {form.formState.errors.storeId && (
              <p className="text-xs text-destructive">
                {form.formState.errors.storeId?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-green-800 text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            Create admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
