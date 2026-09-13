"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/hooks";
import { LoginFormInput, loginFormSchema } from "@/features/auth/schema";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AlertTriangle, ArrowRight, Eye, EyeOff, Lock, ShieldCheck, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ADMIN_ROLES = ["SUPER_ADMIN", "STORE_ADMIN"];

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormInput) => {
    setFormError(null);
    mutate(data, {
      onSuccess: async (responseData) => {
        const { accessToken, user } = responseData;

        if (!ADMIN_ROLES.includes(user.role)) {
          setFormError("Invalid email or password. Please try again.");
          return;
        }

        await useAuthStore.getState().setAuth(accessToken, user);
        router.push("/admin/products");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          setFormError("Too many attempts, please try again later.");
          return;
        }
        setFormError("Invalid email or password. Please try again.");
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel kiri — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-emerald-950 p-12 text-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900/60 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Secure Enterprise Gateway
          </span>
          <span className="text-xs text-emerald-400/60">v2.4.0</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-none">FreshMart</p>
              <p className="text-xs font-semibold tracking-wider text-emerald-400">
                ADMIN PORTAL
              </p>
            </div>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            Manage stores, products, orders, and your team — all in one place.
          </h1>
          <p className="text-sm text-emerald-200/70">
            Comprehensive operational control for regional distribution centers,
            catalog updates, and authorized staff management.
          </p>

          <div className="flex gap-6 border-t border-emerald-800/60 pt-6 text-xs text-emerald-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> End-to-End Encrypted
            </span>
          </div>
        </div>

        <p className="text-xs text-emerald-400/50">
          Restricted to authorized personnel only.
        </p>
      </div>

      {/* Panel kanan — form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Sign in to your account
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {formError && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {formError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="alex.smith@freshmart.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Password
                </label>
                <a
                  href="/reset-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox defaultChecked />
              Keep me signed in on this device
            </label>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full gap-2 bg-emerald-700 hover:bg-emerald-800 font-bold"
            >
              {isPending ? "Signing In..." : "Sign In"}
              {!isPending && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Access is managed by your Super Admin. Contact them if you need an
            account or a role change.
          </p>
        </div>
      </div>
    </div>
  );
}
