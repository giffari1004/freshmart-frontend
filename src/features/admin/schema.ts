import z from "zod";
import { ROLE, USER_SORT_BY, USER_SORT_ORDER, UserRole } from "./constans";
export const GET_ALL_USER = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),
  role: z.enum(ROLE).optional(),
  sortBy: z.enum(USER_SORT_BY).default("createdAt"),
  sortOrder: z.enum(USER_SORT_ORDER).default("desc"),
});
export const CREATE_STORE_ADMIN = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  storeId: z.string().uuid(" Invalid input store id"),
});
export const UPDATE_STORE_ADMIN = z.object({
  name: z.string().min(1).optional(),
  storeId: z.string().uuid().optional(),
});

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeId: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface UsersMeta {
  page: number,
  limit: number,
  totalData: number,
  totalPages: number,
}

export type getAllUserSchema = z.infer<typeof GET_ALL_USER>;
export type createStoreAdminSchema = z.infer<typeof CREATE_STORE_ADMIN>;
export type updateStoreAdminSchema = z.infer<typeof UPDATE_STORE_ADMIN>;
