"use client";

import { MapPin, X } from "lucide-react";
import { useLocationStore } from "@/stores/location-store";
import { useNearestStore } from "@/features/storefront/hooks";

export function LocationBanner() {
  const { permissionState, requestLocation, dismissWithoutLocation } =
    useLocationStore();
  const { data: nearest } = useNearestStore();

  // Sudah dijawab (granted ATAU denied) -> banner tidak perlu tampil lagi.
  if (permissionState !== "pending") return null;

  const storeName = nearest?.store.name ?? "toko terdekat kamu";

  return (
    <div className="flex items-center justify-between gap-4 bg-primary px-4 py-3 text-primary-foreground md:px-8">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 shrink-0" />
        <p className="text-sm">
          Izinkan akses lokasi untuk lihat produk paling fresh dari{" "}
          <span className="font-semibold">{storeName}</span>.
        </p>
        <button
          onClick={requestLocation}
          className="ml-2 shrink-0 whitespace-nowrap font-bold underline underline-offset-2 hover:no-underline"
        >
          Allow Access
        </button>
      </div>
      <button
        onClick={dismissWithoutLocation}
        aria-label="Dismiss location banner"
        className="shrink-0 rounded-full p-1 hover:bg-primary-foreground/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
