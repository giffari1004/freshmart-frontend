import { api } from "@/lib/axios";

export interface CheckoutAddressOption {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;
  isPrimary?: boolean;
}

export interface CheckoutShippingOption {
  id: string;
  courierCode: string;
  serviceCode: string;
  serviceName: string;
  cost: number;
  etd: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

function unwrap<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    (payload as { data?: unknown }).data !== undefined
  ) {
    return (payload as ApiResponse<T>).data;
  }

  return payload as T;
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value;
  if (
    value &&
    typeof value === "object" &&
    "items" in value &&
    Array.isArray((value as { items?: unknown }).items)
  ) {
    return (value as { items: T[] }).items;
  }
  if (
    value &&
    typeof value === "object" &&
    "options" in value &&
    Array.isArray((value as { options?: unknown }).options)
  ) {
    return (value as { options: T[] }).options;
  }
  return [];
}

function toNumber(value: unknown): number {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

function normalizeAddress(item: Record<string, unknown>): CheckoutAddressOption {
  return {
    id: String(item.id ?? ""),
    label: String(item.label ?? "Address"),
    recipientName: String(item.recipientName ?? item.name ?? ""),
    phone: String(item.phone ?? item.recipientPhone ?? ""),
    province: String(item.province ?? ""),
    city: String(item.city ?? ""),
    district: String(item.district ?? ""),
    fullAddress: String(item.fullAddress ?? item.address ?? ""),
    latitude: item.latitude == null ? null : toNumber(item.latitude),
    longitude: item.longitude == null ? null : toNumber(item.longitude),
    isPrimary: Boolean(item.isPrimary),
  };
}

function normalizeShipping(item: Record<string, unknown>): CheckoutShippingOption {
  return {
    id: String(item.id ?? ""),
    courierCode: String(item.courierCode ?? item.courier ?? ""),
    serviceCode: String(item.serviceCode ?? ""),
    serviceName: String(item.serviceName ?? item.name ?? "Shipping"),
    cost: toNumber(item.cost ?? item.price),
    etd: item.etd == null ? null : String(item.etd),
  };
}

export const checkoutDataService = {
  async getAddresses(): Promise<CheckoutAddressOption[]> {
    const response = await api.get("/addresses");
    const data = unwrap<unknown>(response.data);
    return asArray<Record<string, unknown>>(data)
      .map(normalizeAddress)
      .filter((item) => item.id);
  },

  async getShippingOptions(
    addressId: string,
    storeId: string,
    weightGram: number,
  ): Promise<CheckoutShippingOption[]> {
    const response = await api.post(
      `/addresses/${addressId}/shipping-options`,
      {
        storeId,
        weightGram,
      },
    );
    const data = unwrap<unknown>(response.data);
    return asArray<Record<string, unknown>>(data)
      .map(normalizeShipping)
      .filter((item) => item.id);
  },
};
