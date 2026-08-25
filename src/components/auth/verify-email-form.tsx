"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Eye, EyeOff, Info, AlertCircle } from "lucide-react";
import axios from "axios";

import {
  verifyEmailFormSchema,
  VerifyEmailFormInput,
  resendVerificationSchema,
  ResendVerificationInput,
} from "@/features/auth/schema";
import { useVerifyEmail, useResendVerification } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Local state to manage component view states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(!token);
  const [resentEmail, setResentEmail] = useState<string | null>(null);

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutations
  const { mutate: executeVerify, isPending: isVerifying } = useVerifyEmail();
  const { mutate: executeResend, isPending: isResending } =
    useResendVerification();

  // Primary Form (Set Password)
  const {
    register: registerVerify,
    handleSubmit: handleSubmitVerify,
    formState: { errors: verifyErrors },
  } = useForm<VerifyEmailFormInput>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Secondary Form (Resend Verification Email)
  const {
    register: registerResend,
    handleSubmit: handleSubmitResend,
    formState: { errors: resendErrors },
  } = useForm<ResendVerificationInput>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onVerifySubmit = (data: VerifyEmailFormInput) => {
    if (!token) {
      setIsInvalidToken(true);
      return;
    }

    executeVerify(
      { token, password: data.password },
      {
        onSuccess: () => {
          setIsSuccess(true);
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
              error.response.data?.message ||
                "Verification failed. Please try again.",
            );
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        },
      },
    );
  };

  const onResendSubmit = (data: ResendVerificationInput) => {
    executeResend(data, {
      onSuccess: () => {
        setResentEmail(data.email);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message = error.response.data?.message;

          if (status === 400 || status === 404) {
            toast.error(message || "Unable to resend verification link.");
            return;
          }
          if (status === 429) {
            toast.error("Too many attempts, please try again later");
            return;
          }
          toast.error(message || "Failed to resend verification email.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      },
    });
  };

  // STATE D: Verification Success
  if (isSuccess) {
    return (
      <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Your account is ready!
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Please log in to start shopping.
        </p>
        <Button asChild className="w-full font-bold" size="lg">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  // STATE C: Invalid or Expired Link
  if (isInvalidToken) {
    return (
      <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            This link is invalid or has expired
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we&apos;ll send you a new verification link.
          </p>
        </div>

        {resentEmail ? (
          <div className="rounded-md border border-border bg-muted/50 p-4 text-center text-sm text-foreground">
            A new verification link has been sent to{" "}
            <span className="font-semibold">{resentEmail}</span>.
          </div>
        ) : (
          <form
            onSubmit={handleSubmitResend(onResendSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="name@example.com"
                {...registerResend("email")}
                className={
                  resendErrors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {resendErrors.email && (
                <p className="text-xs text-destructive mt-1">
                  {resendErrors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isResending}
              className="w-full font-bold"
              size="lg"
            >
              {isResending ? "Resending..." : "Resend Verification Email"}
            </Button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="font-bold text-primary hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  // STATE B: Default Form (Valid token state)
  return (
    <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm">
      {/* Brand & Heading Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/images/logo-freshmart.png"
          alt="FreshMart Logo"
          width={48}
          height={48}
          className="mb-4"
          priority
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          Verify your email & set a password
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          You&apos;re verifying your account — set a password to finish creating
          it.
        </p>
      </div>

      {/* Password Form */}
      <form
        onSubmit={handleSubmitVerify(onVerifySubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            New Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...registerVerify("password")}
              className={`pr-10 ${
                verifyErrors.password
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
          {verifyErrors.password && (
            <p className="text-xs text-destructive mt-1">
              {verifyErrors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...registerVerify("confirmPassword")}
              className={`pr-10 ${
                verifyErrors.confirmPassword
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
          {verifyErrors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">
              {verifyErrors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>Must be at least 8 characters</span>
        </div>

        <Button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-2"
          size="lg"
        >
          {isVerifying ? "Verifying..." : "Verify & Set Password"}
        </Button>
      </form>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          This link expires 1 hour after registration.
        </p>
      </div>
    </div>
  );
}
