import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground text-sm">Loading...</div>}
    >
      <LoginForm />
    </Suspense>
  );
}
