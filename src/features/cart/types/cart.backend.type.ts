import { CartResponse } from "../cartType";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface BackendProductImage {
  id?: string;
  imageUrl?: string | null;
  isPrimary?: boolean;
}

export interface BackendProduct {
  id: string;
  name: string;
  basePrice?: number | string | null;
  weight: number | string;
  images?: BackendProductImage[];
}

export interface BackendStore {
  id: string;
}

export interface BackendStoreProduct {
  id: string;
  priceOverride?: number | string | null;
  product?: BackendProduct | null;
  store?: BackendStore | null;
}

export interface BackendCartItem {
  id: string;
  cartId?: string;
  storeProductId: string;
  quantity: number;
  storeProduct?: BackendStoreProduct | null;
  unitPrice?: number | string | null;
  subtotal?: number | string | null;
  weight?: number | string | null;
  product?: {
    id: string;
    name: string;
    imageUrl?: string | null;
  } | null;
}

export interface BackendCart {
  id: string;
  userId: string;
  items?: BackendCartItem[];
}

export type CartApiResponse =
  | ApiResponse<BackendCart>
  | BackendCart
  | ApiResponse<CartResponse>
  | CartResponse;
