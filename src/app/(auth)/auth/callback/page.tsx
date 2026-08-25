import React, { Suspense } from "react";
import { AuthCallback } from "@/components/auth/auth-callback";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground text-sm">Loading...</div>}
    >
      <AuthCallback />
    </Suspense>
  );
}
