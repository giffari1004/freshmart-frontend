"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addressFormSchema, AddressFormInput, AddressFormOutput } from "@/features/address/schema";
import { Address, geocodeCity } from "@/features/address/api";
import { useCreateAddress, useUpdateAddress } from "@/features/address/hooks";
import { CityCombobox } from "./city-combobox";
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
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: Address;
}
const LocationPicker = dynamic(() => import("../shared/location-picker"), {
  ssr: false,
});

export function AddressFormDialog({
  open,
  onOpenChange,
  mode,
  initialData,
}: AddressFormDialogProps) {
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress(initialData?.id || "");

  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<AddressFormInput, unknown, AddressFormOutput>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      label: "",
      recipientName: "",
      phone: "",
      city: "",
      rajaOngkirCityId: "",
      province: "",
      district: "",
      fullAddress: "",
      latitude: undefined,
      longitude: undefined,
      isPrimary: false,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;


  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        reset({
          label: initialData.label || "",
          recipientName: initialData.recipientName || "",
          phone: initialData.phone || "",
          city: initialData.city || "",
          rajaOngkirCityId: initialData.rajaOngkirCityId || "",
          province: initialData.province || "",
          district: initialData.district || "",
          fullAddress: initialData.fullAddress || "",
          latitude: initialData.latitude,
          longitude: initialData.longitude,
          isPrimary: initialData.isPrimary || false,
        });
      } else {
        reset({
          label: "",
          recipientName: "",
          phone: "",
          city: "",
          rajaOngkirCityId: "",
          province: "",
          district: "",
          fullAddress: "",
          latitude: undefined,
          longitude: undefined,
          isPrimary: false,
        });
      }
    }
  }, [open, mode, initialData, reset]);

  const selectedCity = useWatch({ control: form.control, name: "city" });
  const selectedProvince = useWatch({
    control: form.control,
    name: "province",
  });
  const lat = useWatch({ control: form.control, name: "latitude" });
  const lng = useWatch({ control: form.control, name: "longitude" });
  const isPrimary = useWatch({ control: form.control, name: "isPrimary" });

  const onSubmit = (data: AddressFormOutput) => {
    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    } else {
      const { isPrimary, ...updatePayload } = data;
      updateMutation.mutate(updatePayload, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-135 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {mode === "create" ? "Add New Address" : "Edit Address"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 py-2"
          noValidate
        >
          {/* Row: Label & Recipient Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="label"
                className="text-xs font-semibold text-foreground"
              >
                Address Label
              </label>
              <Input
                id="label"
                placeholder="e.g. Home, Office"
                {...register("label")}
                className={
                  errors.label
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {errors.label && (
                <p className="text-xs text-destructive">
                  {errors.label.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="recipientName"
                className="text-xs font-semibold text-foreground"
              >
                Recipient Name
              </label>
              <Input
                id="recipientName"
                placeholder="Full name"
                {...register("recipientName")}
                className={
                  errors.recipientName
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {errors.recipientName && (
                <p className="text-xs text-destructive">
                  {errors.recipientName.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="text-xs font-semibold text-foreground"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 000-0000"
              {...register("phone")}
              className={
                errors.phone
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Row: City & Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                City
              </label>
              <CityCombobox
                value={selectedCity}
                error={!!errors.city}
                onSelect={async (selected) => {
                  setValue("city", selected.cityName, { shouldValidate: true });
                  setValue("rajaOngkirCityId", selected.rajaOngkirCityId, {
                    shouldValidate: true,
                  });
                  setValue("province", selected.province, {
                    shouldValidate: true,
                  });

                  try {
                    const coords = await geocodeCity(
                      `${selected.cityName}, ${selected.province}`,
                    );
                    setValue("latitude", coords.latitude, {
                      shouldValidate: true,
                    });
                    setValue("longitude", coords.longitude, {
                      shouldValidate: true,
                    });
                  } catch {}
                }}
              />
              {errors.city && (
                <p className="text-xs text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="province"
                className="text-xs font-semibold text-foreground"
              >
                Province
              </label>
              <Input
                id="province"
                value={selectedProvince}
                placeholder="Select a city first"
                disabled
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              {errors.province && (
                <p className="text-xs text-destructive">
                  {errors.province.message}
                </p>
              )}
            </div>
          </div>

          {/* District */}
          <div className="space-y-1">
            <label
              htmlFor="district"
              className="text-xs font-semibold text-foreground"
            >
              District
            </label>
            <Input
              id="district"
              placeholder="e.g. North District"
              {...register("district")}
              className={
                errors.district
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.district && (
              <p className="text-xs text-destructive">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* Full Address */}
          <div className="space-y-1">
            <label
              htmlFor="fullAddress"
              className="text-xs font-semibold text-foreground"
            >
              Full Address
            </label>
            <Textarea
              id="fullAddress"
              rows={3}
              placeholder="Street name, building number, suite/apartment"
              {...register("fullAddress")}
              className={
                errors.fullAddress
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.fullAddress && (
              <p className="text-xs text-destructive">
                {errors.fullAddress.message}
              </p>
            )}
          </div>

          {/* Pin Exact Location */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Pin Exact Location
            </label>
            <LocationPicker
              latitude={lat ?? null}
              longitude={lng ?? null}
              onChange={(newLat, newLng) => {
                setValue("latitude", newLat, { shouldValidate: true });
                setValue("longitude", newLng, { shouldValidate: true });
              }}
            />
            {(errors.latitude || errors.longitude) && (
              <p className="text-xs text-destructive">
                Please click the map to pin your exact location
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Latitude
              </label>
              <Input
                readOnly
                value={lat !== undefined ? lat.toFixed(6) : ""}
                placeholder="Not set"
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Longitude
              </label>
              <Input
                readOnly
                value={lng !== undefined ? lng.toFixed(6) : ""}
                placeholder="Not set"
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          {/* Set as Primary Checkbox (Create Mode Only) */}
          {mode === "create" && (
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="isPrimary"
                checked={isPrimary}
                onCheckedChange={(checked) =>
                  setValue("isPrimary", Boolean(checked))
                }
              />
              <label
                htmlFor="isPrimary"
                className="text-xs font-medium text-foreground cursor-pointer"
              >
                Set as primary address
              </label>
            </div>
          )}

          <DialogFooter className="pt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              {isPending
                ? "Saving..."
                : mode === "create"
                  ? "Add Address"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
