export const ROLE = ["SUPER_ADMIN", "STORE_ADMIN", "CUSTOMER"] as const;
export type UserRole = (typeof ROLE)[number];
export const USER_SORT_BY = ["name", "createdAt"] as const;
export const USER_SORT_ORDER = ["asc", "desc"] as const;
export const ADMIN_NAV_ITEMS = [
  { label: "Stores", href: "/admin/stores", roles: ["SUPER_ADMIN"] },
  { label: "Users", href: "/admin/users", roles: ["SUPER_ADMIN"] },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Discounts", href: "/admin/discounts" },
  { label: "Reports", href: "/admin/reports" },
];