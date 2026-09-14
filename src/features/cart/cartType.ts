export interface CartProduct {
  id: string;
  name: string;
  imageUrl: string | null;
}

export interface CartItem {
  id: string;
  storeProductId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  weight: number;
  product: CartProduct;
}

export interface CartResponse {
  id: string;
  userId: string;
  storeId: string | null;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface AddToCartPayload {
  storeProductId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  quantity: number;
}

export interface CartPromotion {
  discountId: string;
  type: "DIRECT" | "MIN_PURCHASE" | "BUY1GET1";
  productId: string | null;
  amount: number;
  freeQuantity: number;
}

export interface CartVoucher {
  id: string;
  code: string;
  usageType: string;
  valueType: string;
  value: number;
  minPurchaseAmount: number | null;
  expiredAt: string;
}

export interface CartPromotionsResponse {
  storeId: string;
  promotions: CartPromotion[];
  vouchers: CartVoucher[];
  totalAmount: number;
}
