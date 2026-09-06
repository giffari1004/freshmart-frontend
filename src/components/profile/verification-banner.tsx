"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { ProfileData } from "@/features/profile/api";
import { useResendVerification } from "@/features/auth/hooks";

interface VerificationBannerProps {
  profile: ProfileData;
}

export function VerificationBanner({ profile }: VerificationBannerProps) {
  const { mutate: resendEmail, isPending } = useResendVerification();

  if (profile.isVerified) {
    return null;
  }

  const handleResend = () => {
    resendEmail(
      { email: profile.email },
      {
        onSuccess: () => {
          toast.success("Verification link sent to your email.");
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Failed to resend verification email.");
          }
        },
      },
    );
  };

  return (
    <div className="w-full bg-secondary/10 border border-border rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-secondary-foreground">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5 md:mt-0" />
        <p className="text-sm">
          Your email is not verified. Please check your inbox for a verification
          link to ensure full account access and security.
        </p>
      </div>
      <button
        type="button"
        onClick={handleResend}
        disabled={isPending}
        className="text-sm font-semibold text-primary hover:underline shrink-0 disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Resend Email"}
      </button>
    </div>
  );
}
