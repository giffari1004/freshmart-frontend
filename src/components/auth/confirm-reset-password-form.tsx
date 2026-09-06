"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Info, AlertCircle } from "lucide-react";
import axios from "axios";

import {
  confirmResetPasswordSchema,
  ConfirmResetPasswordInput,
} from "@/features/auth/schema";
import { useConfirmResetPassword } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConfirmResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isInvalidToken, setIsInvalidToken] = useState(!token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useConfirmResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmResetPasswordInput>({
    resolver: zodResolver(confirmResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ConfirmResetPasswordInput) => {
    if (!token) {
      setIsInvalidToken(true);
      return;
    }

    mutate(
      { token, password: data.password },
      {
        onSuccess: () => {
          toast.success("Your password has been reset successfully.");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            if (status === 400) {
              setIsInvalidToken(true);
              return;
            }
            if (status === 429) {
              toast.error("Too many attempts, please try again later");
              return;
            }
            toast.error(
              error.response.data?.message || "Failed to reset password.",
            );
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        },
      },
    );
  };

  // STATE C: Invalid or Expired Link
  if (isInvalidToken) {
    return (
      <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">
          This link is invalid or has expired
        </h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Password reset links expire after 1 hour. Request a new one to
          continue.
        </p>
        <Button asChild className="w-full font-bold" size="lg">
          <Link href="/reset-password">Request New Link</Link>
        </Button>
      </div>
    );
  }

  // STATE B: Form
  return (
    <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/images/logo-freshmart.png"
          alt="FreshMart Logo"
          width={48}
          height={48}
          className="mb-4"
          priority
        />
        <h1 className="text-2xl font-bold text-foreground">
          Set a new password
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a new password for your FreshMart account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            NEW PASSWORD
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`pr-10 ${
                errors.password
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-destructive mt-1">
              {errors.password.message}
            </p>
          ) : (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>Must be at least 8 characters</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            CONFIRM NEW PASSWORD
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`pr-10 ${
                errors.confirmPassword
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-2"
          size="lg"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-border text-center">
        <Link
          href="/login"
          className="text-sm font-bold text-primary hover:underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
