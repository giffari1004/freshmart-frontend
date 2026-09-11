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
      setAuth: (accessToken, user) => {
        set({ accessToken, user });
      },
      logout: () => {
        set({ accessToken: null, user: null });
        api.post("/auth/logout").catch(() => {});
      },
    }),
    { name: "freshmart-auth" },
  ),
);
