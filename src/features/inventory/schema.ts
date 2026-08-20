import z from "zod";
import {
  HISTORY_STOCK_SORT_BY,
  INVENTORY_SORT_BY,
  INVENTORY_SORT_ORDER,
  STOCK_JOURNAL_TYPE,
} from "./constant";
export const CREATE_INVENTORY = z.object({
  storeId: z.string().uuid("Invalid store id"),
  productId: z.string().uuid("Invalid product id"),
  priceOverride: z.number().optional(),
});
export const UPDATE_INVENTORY = z.object({
  priceOverride: z.number().optional(),
});
export const GET_ALL_INVENTORY = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  sortBy: z.enum(INVENTORY_SORT_BY).default("createdAt"),
  sortOrder: z.enum(INVENTORY_SORT_ORDER).default("desc"),
  storeId: z.string().uuid("Invalid store id").optional(),
});
export const STOCK_IN = z.object({
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});
export const STOCK_OUT = z.object({
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});
export const GET_STOCK_HISTORY = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  type: z.enum(STOCK_JOURNAL_TYPE).optional(),
  sortBy: z.enum(HISTORY_STOCK_SORT_BY).default("createdAt"),
  sortOrder: z.enum(INVENTORY_SORT_ORDER).default("desc"),
});
export interface InventoryMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}
export interface Product {
  id: string;
  name: string;
}
export interface Store {
  id: string;
  name: string;
}
export interface Inventory {
  id: string;
  priceOverride: number | null;
  stockQuantity: number;
  createdAt: string;
  product: Product;
  store: Store;
}
export interface StockJournal {
  id: string;
  type: "IN" | "OUT";
  quantity: number;
  beforeStock: number;
  afterStock: number;
  notes?: string | null;
  createdAt: string;
}
export type getAllInventorySchema = z.infer<typeof GET_ALL_INVENTORY>;
export type createInventorySchema = z.infer<typeof CREATE_INVENTORY>;
export type updateInventorySchema = z.infer<typeof UPDATE_INVENTORY>;
export type stockInSchema = z.infer<typeof STOCK_IN>;
export type stockOutSchema = z.infer<typeof STOCK_OUT>;
export type getStockHistorySchema = z.infer<typeof GET_STOCK_HISTORY>;
