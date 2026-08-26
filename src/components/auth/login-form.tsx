"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import axios from "axios";

import { loginFormSchema, LoginFormInput } from "@/features/auth/schema";
import { useLogin } from "@/features/auth/hooks";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ERROR_MESSAGES: Record<string, string> = {
  oauth_cancelled: "You cancelled the sign-in process. Please try again.",
  oauth_failed:
    "We couldn't sign you in with that provider. Please try again or use your email.",
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInput) => {
    setFormError(null);
    mutate(data, {
      onSuccess: (responseData) => {
        const { accessToken, user } = responseData;

        // 1. Update Zustand store
        useAuthStore.getState().setAuth(accessToken, user);

        // 2. Redirect
        router.push(redirectTo);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message = error.response.data?.message;

          if (status === 401) {
            setFormError("Invalid email or password. Please try again.");
            return;
          }

          if (status === 429) {
            toast.error("Too many attempts, please try again later");
            return;
          }

          toast.error(message || "Login failed. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      },
    });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    toast.error(
      ERROR_MESSAGES[error] ?? "Something went wrong during sign-in.",
    );

    // Bersihkan query param supaya refresh/back-forward tidak
    // memicu toast yang sama berulang kali.
    router.replace("/login", { scroll: false });
  }, [searchParams, router]);

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
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Log in to continue shopping at your nearest FreshMart store
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
          or log in with email
        </span>
      </div>

      {/* Form-level Error Banner */}
      {formError && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p>{formError}</p>
        </div>
      )}

      {/* Form */}
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
            <p className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Link
              href="/reset-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
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
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-2"
          size="lg"
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {/* Footer link inside card */}
      <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
