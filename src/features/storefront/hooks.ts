import { useQuery } from "@tanstack/react-query";
import { getNearestStore, getCategories, getPromotions } from "./api";
import { useLocationStore } from "@/stores/location-store";

export function useNearestStore() {
  const { latitude, longitude, permissionState } = useLocationStore();

  return useQuery({
    // Query key sengaja include lat/lng — kalau user pindah lokasi
    // (jarang, tapi bisa terjadi lewat "Change location"), query otomatis
    // refetch alih-alih nyangkut di cache toko lama.
    queryKey: ["nearest-store", latitude, longitude],
    queryFn: () =>
      getNearestStore(
        latitude !== null && longitude !== null
          ? { lat: latitude, lng: longitude }
          : {},
      ),
    // Tetap jalan walau permission belum diberikan — endpoint fallback ke
    // toko default kalau lat/lng kosong (lihat storefront.service.ts).
    enabled: permissionState !== "pending",
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000, // jarang berubah, cache lebih lama
  });
}

export function usePromotions(storeId?: string) {
  return useQuery({
    queryKey: ["promotions", storeId],
    queryFn: () => getPromotions(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  });
}
