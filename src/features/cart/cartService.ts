import { api } from "@/lib/axios";
import {
  AddToCartPayload,
  CartItem,
  CartProduct,
  CartResponse,
  UpdateCartPayload,
} from "./cartType";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface BackendProductImage {
  id?: string;
  imageUrl?: string | null;
  isPrimary?: boolean;
}

interface BackendProduct {
  id: string;
  name: string;
  basePrice?: number | string | null;
  weight: number | string;
  images?: BackendProductImage[];
}

interface BackendStore {
  id: string;
}

interface BackendStoreProduct {
  id: string;
  priceOverride?: number | string | null;
  product?: BackendProduct | null;
  store?: BackendStore | null;
}

interface BackendCartItem {
  id: string;
  cartId?: string;
  storeProductId: string;
  quantity: number;
  storeProduct?: BackendStoreProduct | null;

  // Support apabila backend suatu saat sudah mengirim
  // hasil transformasi ini secara langsung.
  unitPrice?: number | string | null;
  subtotal?: number | string | null;
  weight?: number | string | null;
  product?: {
    id: string;
    name: string;
    imageUrl?: string | null;
  } | null;
}

interface BackendCart {
  id: string;
  userId: string;
  items?: BackendCartItem[];
}

type CartApiResponse =
  | ApiResponse<BackendCart>
  | BackendCart
  | ApiResponse<CartResponse>
  | CartResponse;

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await api.get<CartApiResponse>("/cart");

    return normalizeCartResponse(response.data);
  },

  async addToCart(
    payload: AddToCartPayload,
  ): Promise<CartResponse> {
    const response = await api.post<CartApiResponse>(
      "/cart/items",
      payload,
    );

    return normalizeCartResponse(response.data);
  },

  async updateCartItem(
    itemId: string,
    payload: UpdateCartPayload,
  ): Promise<CartResponse> {
    const response = await api.patch<CartApiResponse>(
      `/cart/items/${itemId}`,
      payload,
    );

    return normalizeCartResponse(response.data);
  },

  async removeCartItem(
    itemId: string,
  ): Promise<CartResponse> {
    const response = await api.delete<CartApiResponse>(
      `/cart/items/${itemId}`,
    );

    return normalizeCartResponse(response.data);
  },

  async clearCart() {
    const response =
      await api.delete<CartApiResponse>("/cart");

    return response.data;
  },
};

function normalizeCartResponse(
  response: CartApiResponse,
): CartResponse {
  const rawCart = unwrapCart(response);

  const rawItems = Array.isArray(rawCart.items)
    ? rawCart.items
    : [];

  const items: CartItem[] = rawItems.map(
    normalizeCartItem,
  );

  const storeId =
    rawItems[0]?.storeProduct?.store?.id ?? null;

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = items.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  return {
    id: rawCart.id,
    userId: rawCart.userId,
    storeId,
    items,
    totalItems,
    subtotal,
  };
}

function normalizeCartItem(
  rawItem: BackendCartItem,
): CartItem {
  /*
   * Support both possible shapes:
   *
   * 1. Backend raw Prisma response
   *    item.storeProduct.product
   *
   * 2. Already normalized response
   *    item.product
   */
  const backendProduct =
    rawItem.storeProduct?.product ?? null;

  const directProduct = rawItem.product ?? null;

  if (!backendProduct && !directProduct) {
    throw new Error(
      `Invalid cart item ${rawItem.id}: product data is missing`,
    );
  }

  const productId =
    directProduct?.id ??
    backendProduct?.id;

  const productName =
    directProduct?.name ??
    backendProduct?.name;

  if (!productId || !productName) {
    throw new Error(
      `Invalid cart item ${rawItem.id}: product identity is incomplete`,
    );
  }

  const imageUrl = resolveProductImage(
    directProduct?.imageUrl ?? null,
    backendProduct?.images ?? [],
  );

  const product: CartProduct = {
    id: productId,
    name: productName,
    imageUrl,
  };

  const unitPrice = resolveUnitPrice(rawItem);

  const subtotal =
    rawItem.subtotal !== null &&
    rawItem.subtotal !== undefined
      ? toNumber(rawItem.subtotal)
      : unitPrice * rawItem.quantity;

 const productWeight =
  rawItem.storeProduct?.product?.weight;

if (
  rawItem.weight === undefined &&
  rawItem.weight === null &&
  (productWeight === undefined ||
    productWeight === null)
) {
  throw new Error(
    `Invalid cart item ${rawItem.id}: product weight is missing`,
  );
}

const weight =
  rawItem.weight !== null &&
  rawItem.weight !== undefined
    ? toNumber(rawItem.weight)
    : toNumber(productWeight!) * rawItem.quantity;

  return {
    id: rawItem.id,
    storeProductId: rawItem.storeProductId,
    quantity: rawItem.quantity,
    unitPrice,
    subtotal,
    weight,
    product,
  };
}

function resolveUnitPrice(
  rawItem: BackendCartItem,
): number {
  if (
    rawItem.unitPrice !== null &&
    rawItem.unitPrice !== undefined
  ) {
    return toNumber(rawItem.unitPrice);
  }

  const override =
    rawItem.storeProduct?.priceOverride;

  if (
    override !== null &&
    override !== undefined
  ) {
    return toNumber(override);
  }

  const basePrice =
    rawItem.storeProduct?.product?.basePrice;

  if (
    basePrice !== null &&
    basePrice !== undefined
  ) {
    return toNumber(basePrice);
  }

  throw new Error(
    `Invalid cart item ${rawItem.id}: price is missing`,
  );
}

function resolveProductImage(
  directImageUrl: string | null,
  images: BackendProductImage[],
): string | null {
  if (directImageUrl) {
    return directImageUrl;
  }

  const primaryImage = images.find(
    (image) =>
      image.isPrimary === true &&
      Boolean(image.imageUrl),
  );

  if (primaryImage?.imageUrl) {
    return primaryImage.imageUrl;
  }

  const firstImage = images.find(
    (image) => Boolean(image.imageUrl),
  );

  return firstImage?.imageUrl ?? null;
}

function toNumber(
  value: number | string,
): number {
  const result = Number(value);

  if (!Number.isFinite(result)) {
    throw new Error(
      `Invalid numeric value received from cart API: ${value}`,
    );
  }

  return result;
}

function unwrapCart(
  response: CartApiResponse,
): BackendCart {
  if (isWrappedResponse(response)) {
    return response.data;
  }

  return response;
}

function isWrappedResponse(
  response: CartApiResponse,
): response is
  | ApiResponse<BackendCart>
  | ApiResponse<CartResponse> {
  return (
    !!response &&
    typeof response === "object" &&
    "data" in response &&
    !!response.data
  );
}