import React, { Suspense } from "react";
import { ConfirmResetPasswordForm } from "@/components/auth/confirm-reset-password-form";

export default function ConfirmResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmResetPasswordForm />
    </Suspense>
  );
}
