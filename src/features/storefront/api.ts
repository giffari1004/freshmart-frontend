import { api } from "@/lib/axios";

export interface Store {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  maxServiceRadiusKm: number;
}

export interface NearestStoreResult {
  store: Store;
  distanceKm: number | null;
  isInRange: boolean;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Promotion {
  id: string;
  type: "PRODUCT" | "STORE" | "BUY1GET1";
  valueType: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  product?: {
    id: string;
    name: string;
    images: { imageUrl: string; isPrimary: boolean }[];
  } | null;
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getNearestStore(params: {
  lat?: number;
  lng?: number;
}) {
  const { data } = await api.get<ApiEnvelope<NearestStoreResult>>(
    "/storefront/stores/nearest",
    { params },
  );
  return data.data;
}

export async function getCategories() {
  const { data } =
    await api.get<ApiEnvelope<Category[]>>("/storefront/categories");
  return data.data;
}

export async function getPromotions(storeId?: string) {
  const { data } = await api.get<ApiEnvelope<Promotion[]>>(
    "/storefront/promotions",
    { params: { storeId } },
  );
  return data.data;
}
