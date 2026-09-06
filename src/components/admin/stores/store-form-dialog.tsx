"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CityCombobox } from "@/components/address/city-combobox";
import {
  storeFormSchema,
  StoreFormInput,
  Store,
  StoreFormOutput,
} from "@/features/store/schema";
import { useCreateStore, useUpdateStore } from "@/features/store/hooks";

const LocationPicker = dynamic(() => import("../../shared/location-picker"), {
  ssr: false,
});

interface StoreFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: Store;
}

export function StoreFormDialog({
  open,
  onOpenChange,
  mode,
  initialData,
}: StoreFormDialogProps) {
  const createMutation = useCreateStore();
  const updateMutation = useUpdateStore();

  const form = useForm<StoreFormInput, unknown, StoreFormOutput>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
      code: "",
      address: "",
      city: "",
      rajaOngkirCityId: "",
      latitude: undefined,
      longitude: undefined,
      maxServiceRadiusKm: 5,
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        form.reset({
          name: initialData.name,
          code: initialData.code,
          address: initialData.address,
          city: initialData.city,
          rajaOngkirCityId: initialData.rajaOngkirCityId,
          latitude: initialData.latitude,
          longitude: initialData.longitude,
          maxServiceRadiusKm: initialData.maxServiceRadiusKm,
          isActive: initialData.isActive,
        });
      } else {
        form.reset({
          name: "",
          code: "",
          address: "",
          city: "",
          rajaOngkirCityId: "",
          latitude: undefined,
          longitude: undefined,
          maxServiceRadiusKm: 5,
          isActive: true,
        });
      }
    }
  }, [open, mode, initialData, form]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: StoreFormOutput) => {
    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    } else if (initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, payload: data },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  };

  const lat = useWatch({control: form.control, name: "latitude"})
  const lng = useWatch({ control: form.control, name: "longitude" });
  const city = useWatch({ control: form.control, name: "city" });
  const isActive = useWatch({ control: form.control, name: "isActive" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Store" : "Edit Store"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                placeholder="e.g. FreshMart Jakarta Central"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="code">Store Code</Label>
              <Input
                id="code"
                placeholder="FM-JKT-01"
                {...form.register("code")}
              />
              <p className="text-[11px] text-muted-foreground">
                Unique identifier, e.g. FM-JKT-01
              </p>
              {form.formState.errors.code && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              placeholder="Enter full street address, building, and postal code"
              className="resize-none"
              rows={2}
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <p className="text-xs text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>City</Label>
            <CityCombobox
              value={city}
              onSelect={(cityData) => {
                form.setValue("city", cityData.cityName, {
                  shouldValidate: true,
                });
                form.setValue("rajaOngkirCityId", cityData.rajaOngkirCityId, {
                  shouldValidate: true,
                });
              }}
            />
            {form.formState.errors.city && (
              <p className="text-xs text-destructive">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Exact Location</Label>
            <LocationPicker
              latitude={lat ?? null}
              longitude={lng ?? null}
              onChange={(newLat, newLng) => {
                form.setValue("latitude", newLat, { shouldValidate: true });
                form.setValue("longitude", newLng, { shouldValidate: true });
              }}
            />
            {(form.formState.errors.latitude ||
              form.formState.errors.longitude) && (
              <p className="text-xs text-destructive">
                Click the map to set a location pin
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Coordinates (Lat, Long)</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={lat !== undefined ? lat.toFixed(4) : ""}
                  placeholder="Lat"
                  className="bg-muted/50"
                />
                <Input
                  readOnly
                  value={lng !== undefined ? lng.toFixed(4) : ""}
                  placeholder="Long"
                  className="bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="radius">Max Service Radius (KM)</Label>
              <div className="relative">
                <Input
                  id="radius"
                  type="number"
                  placeholder="10"
                  className="pr-12"
                  {...form.register("maxServiceRadiusKm")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                  KM
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Maximum distance this store can serve customers
              </p>
              {form.formState.errors.maxServiceRadiusKm && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.maxServiceRadiusKm.message}
                </p>
              )}
            </div>
          </div>

          {mode === "edit" && (
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  Store will be visible to customers upon saving
                </p>
              </div>
              <Switch
                checked={
                  isActive ?? true
                }
                onCheckedChange={(checked) =>
                  form.setValue("isActive", checked)
                }
              />
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : mode === "create"
                  ? "Add Store"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
