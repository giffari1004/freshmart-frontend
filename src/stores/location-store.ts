import { create } from "zustand";

type PermissionState = "pending" | "granted" | "denied";

interface LocationStore {
  latitude: number | null;
  longitude: number | null;
  permissionState: PermissionState;
  requestLocation: () => void;
  dismissWithoutLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  latitude: null,
  longitude: null,
  permissionState: "pending",

  requestLocation: () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      set({ permissionState: "denied" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          permissionState: "granted",
        });
      },
      () => {
        // User tolak izin, atau gagal karena alasan lain — dua-duanya
        // diperlakukan sama: fallback ke toko default (lihat
        // storefront.service.ts di backend, "isDefault: true").
        set({ permissionState: "denied" });
      },
    );
  },

  // Dipanggil kalau user close banner tanpa klik "Allow Access" —
  // beda dari "denied" (browser aktif menolak), ini cuma "belum mau
  // kasih tau sekarang". Diperlakukan sama di sisi query (fallback ke
  // toko default), tapi dipisah state-nya biar gampang dibedakan nanti
  // kalau perlu analytics.
  dismissWithoutLocation: () => set({ permissionState: "denied" }),
}));
