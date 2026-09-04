"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addressFormSchema, AddressFormInput } from "@/features/address/schema";
import { Address } from "@/features/address/api";
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

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: Address;
}

export function AddressFormDialog({
  open,
  onOpenChange,
  mode,
  initialData,
}: AddressFormDialogProps) {
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress(initialData?.id || "");

  const isPending = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressFormInput>({
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
      isPrimary: false,
    },
  });

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
          isPrimary: false,
        });
      }
    }
  }, [open, mode, initialData, reset]);

  const selectedCity = watch("city");
  const selectedProvince = watch("province");

  const onSubmit = (data: AddressFormInput) => {
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
                onSelect={(selected) => {
                  setValue("city", selected.cityName, { shouldValidate: true });
                  setValue("rajaOngkirCityId", selected.rajaOngkirCityId, {
                    shouldValidate: true,
                  });
                  setValue("province", selected.province, {
                    shouldValidate: true,
                  });
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

          {/* Set as Primary Checkbox (Create Mode Only) */}
          {mode === "create" && (
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="isPrimary"
                checked={watch("isPrimary")}
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
