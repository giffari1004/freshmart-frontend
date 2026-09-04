"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";

import { registerFormSchema, RegisterFormInput } from "@/features/auth/schema";
import { useRegister } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || undefined;

  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: RegisterFormInput) => {
    mutate(
      { ...data, referralCode },
      {
        onSuccess: () => {
          setSubmittedEmail(data.email);
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const message = error.response.data?.message;

            if (status === 409) {
              setError("email", {
                type: "manual",
                message: message || "This email is already registered",
              });
              return;
            }

            if (status === 429) {
              toast.error("Too many attempts, please try again later");
              return;
            }

            toast.error(message || "Registration failed. Please try again.");
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        },
      },
    );
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (submittedEmail) {
    return (
      <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm text-center">
        <div className="flex justify-center mb-4 text-primary">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Check your email
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          We sent a verification link to{" "}
          <span className="font-semibold text-foreground">
            {submittedEmail}
          </span>
          . Click the link to finish setting up your account.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-105 rounded-lg border border-border bg-background p-6 shadow-sm">
      {/* Header section */}
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
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Join FreshMart and start shopping from your nearest store
        </p>
      </div>

      {/* Social OAuth buttons */}
      <div className="space-y-3 mb-6">
        <a
          href={`${apiUrl}/social-login/google`}
          className="flex items-center justify-center w-full py-2.5 px-4 rounded-md border border-border bg-background hover:bg-accent text-sm font-medium text-foreground transition-colors"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </a>

        <a
          href={`${apiUrl}/social-login/facebook`}
          className="flex items-center justify-center w-full py-2.5 px-4 rounded-md border border-border bg-background hover:bg-accent text-sm font-medium text-foreground transition-colors"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </a>
      </div>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
          or register with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="alex.smith@example.com"
            {...register("email")}
            className={
              errors.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.email && (
            <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-2"
          size="lg"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
        By clicking Register, you agree to our Terms. A verification link will
        be sent to your inbox.
      </p>

      {/* Footer link inside card */}
      <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
