"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";

export function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard dari React StrictMode / re-render ganda yang bisa
    // memicu effect ini jalan dua kali di development.
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login?error=oauth_failed");
      return;
    }

    (async () => {
      try {
        // Set token dulu di store supaya axios interceptor
        // (lib/axios.ts) bisa lampirkan Authorization header
        // saat request session di bawah ini dijalankan.
        useAuthStore.setState({ accessToken: token });

        const res = await api.get("/authorization/session");
        const { id, role } = res.data.data;

        setAuth(token, { id, role });
        router.replace("/");
      } catch {
        useAuthStore.getState().logout();
        router.replace("/login?error=oauth_failed");
      }
    })();
  }, [searchParams, router, setAuth]);

  return <p className="text-sm text-muted-foreground">Signing you in...</p>;
}
