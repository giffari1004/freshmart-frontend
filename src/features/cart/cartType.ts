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

  product: CartProduct;
}

export interface CartResponse {
  id: string;

  userId: string;

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