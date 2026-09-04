import { useQuery } from "@tanstack/react-query";
import { getNearestStore, getCategories, getPromotions } from "./api";
import { useLocationStore } from "@/stores/location-store";

export function useNearestStore() {
  const { latitude, longitude } = useLocationStore();

  return useQuery({
    queryKey: ["nearest-store", latitude, longitude],
    queryFn: () =>
      getNearestStore(
        latitude !== null && longitude !== null
          ? { lat: latitude, lng: longitude }
          : {},
      ),
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
