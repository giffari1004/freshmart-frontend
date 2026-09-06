import { CartItem, CartProduct, CartResponse } from "../cartType";
import {
  BackendCart,
  BackendCartItem,
  BackendProductImage,
  CartApiResponse,
  ApiResponse,
} from "../types/cart.backend.type";

export function normalizeCartResponse(
  response: CartApiResponse,
): CartResponse {
  const cart = unwrapCart(response);
  const rawItems = cart.items ?? [];
  const items = rawItems.map(normalizeCartItem);

  return {
    id: cart.id,
    userId: cart.userId,
    storeId: rawItems[0]?.storeProduct?.store?.id ?? null,
    items,
    totalItems: sumQuantity(items),
    subtotal: sumSubtotal(items),
  };
}

function normalizeCartItem(rawItem: BackendCartItem): CartItem {
  const product = buildProduct(rawItem);
  const unitPrice = resolveUnitPrice(rawItem);
  const subtotal = resolveSubtotal(rawItem, unitPrice);
  const weight = resolveWeight(rawItem);

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

function buildProduct(rawItem: BackendCartItem): CartProduct {
  const direct = rawItem.product;
  const backend = rawItem.storeProduct?.product;
  const productId = direct?.id ?? backend?.id;
  const productName = direct?.name ?? backend?.name;

  if (!productId || !productName) {
    throw new Error(`Invalid cart item ${rawItem.id}: product identity is incomplete`);
  }

  return {
    id: productId,
    name: productName,
    imageUrl: resolveProductImage(direct?.imageUrl ?? null, backend?.images ?? []),
  };
}

function resolveUnitPrice(rawItem: BackendCartItem): number {
  const value = rawItem.unitPrice ?? rawItem.storeProduct?.priceOverride;
  const fallback = rawItem.storeProduct?.product?.basePrice;
  return toNumber(value ?? fallback, rawItem.id, "price");
}

function resolveSubtotal(
  rawItem: BackendCartItem,
  unitPrice: number,
): number {
  return rawItem.subtotal == null
    ? unitPrice * rawItem.quantity
    : toNumber(rawItem.subtotal, rawItem.id, "subtotal");
}

function resolveWeight(rawItem: BackendCartItem): number {
  const weight = rawItem.weight;
  const productWeight = rawItem.storeProduct?.product?.weight;

  if (weight == null && productWeight == null) {
    throw new Error(`Invalid cart item ${rawItem.id}: product weight is missing`);
  }

  return weight == null
    ? toNumber(productWeight, rawItem.id, "weight") * rawItem.quantity
    : toNumber(weight, rawItem.id, "weight");
}

function resolveProductImage(
  directImageUrl: string | null,
  images: BackendProductImage[],
): string | null {
  if (directImageUrl) return directImageUrl;

  const primary = images.find(
    (image) => image.isPrimary === true && Boolean(image.imageUrl),
  );
  return primary?.imageUrl ?? images.find((image) => Boolean(image.imageUrl))?.imageUrl ?? null;
}

function toNumber(
  value: number | string | null | undefined,
  itemId: string,
  field: string,
): number {
  if (value == null) {
    throw new Error(`Invalid cart item ${itemId}: ${field} is missing`);
  }

  const result = Number(value);
  if (!Number.isFinite(result)) {
    throw new Error(`Invalid cart item ${itemId}: ${field} is invalid`);
  }
  return result;
}

function sumQuantity(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function sumSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.subtotal, 0);
}

function unwrapCart(response: CartApiResponse): BackendCart {
  return isWrappedResponse(response) ? response.data : response;
}

function isWrappedResponse(
  response: CartApiResponse,
): response is ApiResponse<BackendCart> | ApiResponse<CartResponse> {
  return Boolean(response) && typeof response === "object" && "data" in response;
}
