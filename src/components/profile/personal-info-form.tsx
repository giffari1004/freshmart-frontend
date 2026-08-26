"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";

import {
  personalInfoSchema,
  PersonalInfoInput,
} from "@/features/profile/schema";
import { ProfileData } from "@/features/profile/api";
import { useUpdateProfile, useUpdateEmail } from "@/features/profile/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

interface PersonalInfoFormProps {
  profile: ProfileData;
}

export function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
  const { mutateAsync: updateProfileMutate, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const { mutateAsync: updateEmailMutate, isPending: isUpdatingEmail } =
    useUpdateEmail();

  const isPending = isUpdatingProfile || isUpdatingEmail;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    values: {
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
    },
  });

  const onSubmit = async (data: PersonalInfoInput) => {
    const isProfileChanged =
      data.name !== profile.name ||
      (data.phone || "") !== (profile.phone || "");
    const isEmailChanged = data.email !== profile.email;

    if (!isProfileChanged && !isEmailChanged) {
      toast.info("No changes to save");
      return;
    }

    try {
      if (isProfileChanged) {
        await updateProfileMutate({
          name: data.name,
          phone: data.phone || undefined,
        });
      }

      if (isEmailChanged) {
        await updateEmailMutate({ email: data.email });
      }
    } catch (error){
      if (axios.isAxiosError(error) && error.response?.status === 409 && error.response?.data?.message) {
        setError("email", {message: error.response.data.message})
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Informational Banner */}
      <div className="bg-accent/60 text-accent-foreground p-3.5 rounded-lg flex items-center gap-3 text-xs sm:text-sm border border-accent">
        <div className="h-6 w-6 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary">
          <Info className="h-4 w-4" />
        </div>
        <span>
          Changing your email address will require a re-verification process for
          account security.
        </span>
      </div>

      {/* Grid Layout: Full Name & Email Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-foreground"
          >
            Full Name
          </label>
          <Input
            id="name"
            {...register("name")}
            className={`h-11 ${
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-foreground"
          >
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={`h-11 ${profile.isVerified ? "pr-28" : ""} ${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
            {/* Inline Verified Badge (Inside Input Field Right Side) */}
            {profile.isVerified && (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-300 bg-emerald-100/60 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md"
                >
                  <CheckCircle2 className="h-3 w-3 fill-emerald-800 text-emerald-100" />
                  VERIFIED
                </Badge>
              </div>
            )}
          </div>
          {errors.email && (
            <p className="text-xs text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone Number Input (Half width on desktop to match Stitch mock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-semibold text-foreground"
          >
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-1234"
            {...register("phone")}
            className={`h-11 ${
              errors.phone
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Right-aligned Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6 h-11"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
