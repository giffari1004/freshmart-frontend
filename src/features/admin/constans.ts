export const ROLE = ["SUPER_ADMIN", "STORE_ADMIN", "CUSTOMER"] as const;
export type UserRole = (typeof ROLE)[number];
export const USER_SORT_BY = ["name", "createdAt"] as const;
export const USER_SORT_ORDER = ["asc", "desc"] as const;
