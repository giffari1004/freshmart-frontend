"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Info } from "lucide-react";
import axios from "axios";

import {
  changePasswordSchema,
  ChangePasswordInput,
} from "@/features/profile/schema";
import { useUpdatePassword } from "@/features/profile/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { mutate: updatePasswordMutate, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    updatePasswordMutate(
      {
        currentPassword: data.currentPassword || undefined,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            const msg = error.response.data.message;
            if (
              msg.toLowerCase().includes("current password is required") ||
              msg.toLowerCase().includes("current password is incorrect")
            ) {
              setError("currentPassword", { message: msg });
            }
          }
        },
      },
    );
  };

  return (
    <div className="border border-border bg-background rounded-lg p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Current Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="currentPassword"
            className="text-sm font-medium text-foreground"
          >
            Current Password
          </label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              className={`pr-10 ${
                errors.currentPassword
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              tabIndex={-1}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-destructive mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-foreground"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className={`pr-10 ${
                  errors.newPassword
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.newPassword ? (
              <p className="text-xs text-destructive mt-1">
                {errors.newPassword.message}
              </p>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>Must be at least 8 characters</span>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                {...register("confirmNewPassword")}
                className={`pr-10 ${
                  errors.confirmNewPassword
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-xs text-destructive mt-1">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="font-bold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
