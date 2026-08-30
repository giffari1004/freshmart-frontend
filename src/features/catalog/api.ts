import { api } from "@/lib/axios";

export interface Product {
  id: string; // productId asli
  storeProductId: string; // id dari row StoreProduct (yang dipakai add-to-cart)
  name: string;
  description: string | null;
  category: { id: string; name: string } | null;
  images: { imageUrl: string; isPrimary: boolean }[];
  price: number;
  originalPrice: number;
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

interface RawStoreProduct {
  id: string;
  stockQuantity: number;
  reservedStock: number;
  product: {
    id: string;
    name: string;
    description: string | null;
    basePrice: number;
    category: { id: string; name: string } | null;
    images: { imageUrl: string; isPrimary: boolean }[];
  };
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

function mapToProduct(raw: RawStoreProduct): Product {
  const available = raw.stockQuantity - raw.reservedStock;
  return {
    id: raw.product.id,
    storeProductId: raw.id,
    name: raw.product.name,
    description: raw.product.description,
    category: raw.product.category,
    images: raw.product.images,
    price: raw.product.basePrice,
    originalPrice: raw.product.basePrice,
    stockAvailable: available,
    inStock: available > 0,
  };
}

export async function getProducts(params: GetProductsParams) {
  const { data } = await api.get<ApiEnvelope<RawStoreProduct[]>>("/products", {
    params,
  });
  return { products: data.data.map(mapToProduct), meta: data.meta };
}
