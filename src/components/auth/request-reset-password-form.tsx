"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import axios from "axios";

import {
  requestResetPasswordSchema,
  RequestResetPasswordInput,
} from "@/features/auth/schema";
import { useRequestResetPassword } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RequestResetPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isPending } = useRequestResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetPasswordInput>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: RequestResetPasswordInput) => {
    mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status === 429) {
            toast.error("Too many attempts, please try again later");
            return;
          }
        }
        // Fallback or generic error handling
        toast.error("An error occurred. Please try again.");
      },
    });
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          We&apos;ve sent a password reset link to your email. It will expire in
          1 hour.
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

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
          Forgot your password?
        </h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Enter the email associated with your account and we&apos;ll send you a
          link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={
              errors.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-2"
          size="lg"
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-border text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
