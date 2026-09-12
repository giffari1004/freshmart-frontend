// src/stores/auth-store.ts
import { api } from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  user: { id: string; role: string } | null;
  setAuth: (token: string, user: AuthStore["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: async (accessToken, user) => {
        set({ accessToken, user });
        fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: accessToken }),
        }).catch(() => {});
      },
      logout: () => {
        set({ accessToken: null, user: null });
        fetch("/api/session", { method: "DELETE" }).catch(() => {});
        api.post("/auth/logout").catch(() => {});
      },
    }),
    { name: "freshmart-auth" },
  ),
);
