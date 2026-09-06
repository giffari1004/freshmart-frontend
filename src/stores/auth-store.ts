// src/stores/auth-store.ts
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
        if (typeof document !== "undefined") {
          document.cookie = `role=${user?.role ?? ""}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 hari, samakan dengan JWT_EXPIRES_IN
        }
      },
      logout: () => {
        set({ accessToken: null, user: null });
        if (typeof document !== "undefined") {
          document.cookie = "role=; path=/; max-age=0"; // hapus cookie
        }
      },
    }),
    { name: "freshmart-auth" },
  ),
);
