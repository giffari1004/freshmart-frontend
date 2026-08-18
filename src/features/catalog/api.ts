import { api } from "@/lib/axios";

export interface Product {
  id: string;
  // Dipakai spesifik untuk add-to-cart — cart items merujuk ke
  // StoreProduct (stok per toko), bukan Product secara langsung.
  storeProductId: string;
  name: string;
  description: string | null;
  category: { id: string; name: string } | null;
  images: { imageUrl: string; isPrimary: boolean }[];
  price: number;
  originalPrice?: number; // ada isinya kalau produk sedang didiskon
  stockAvailable: number;
  inStock: boolean;
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { page: number; limit: number; totalData: number; totalPages: number };
}

export interface GetProductsParams {
  storeId: string;
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: "createdAt" | "basePrice" | "name";
  sortOrder?: "asc" | "desc";
}

/**
 * NOTE: endpoint & bentuk response ini konsumsi punya Feature 2
 * (`GET /products`, product-public-route.ts) — bukan dibuat di sini.
 * Field di atas adalah asumsi terbaik berdasarkan pola response yang
 * dipakai di seluruh backend (`{ success, message, data, meta }`) plus
 * join StoreProduct+Product yang sudah didiskusikan. VERIFIKASI ULANG ke
 * response asli Feature 2 sebelum dianggap final — kalau nama field beda,
 * cukup sesuaikan interface `Product` di atas, komponen lain tidak perlu
 * ikut berubah.
 */
export async function getProducts(params: GetProductsParams) {
  const { data } = await api.get<ApiEnvelope<Product[]>>("/products", {
    params,
  });
  return { products: data.data, meta: data.meta };
}
