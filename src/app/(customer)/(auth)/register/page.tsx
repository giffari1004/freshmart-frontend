import React, { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground text-sm">Loading...</div>}
    >
      <RegisterForm />
    </Suspense>
  );
}
