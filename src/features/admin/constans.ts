export const ROLE = ["SUPER_ADMIN", "STORE_ADMIN", "CUSTOMER"] as const;
export type UserRole = (typeof ROLE)[number];
export const USER_SORT_BY = ["name", "createdAt"] as const;
export const USER_SORT_ORDER = ["asc", "desc"] as const;
import {
  Users,
  Package,
  Tag,
  Boxes,
  Percent,
  FileBarChart,
} from "lucide-react";
export const ADMIN_NAV_ITEMS = [
  { label: "Users", href: "/admin/users", roles: ["SUPER_ADMIN"], icon: Users },
  { label: "Products", href: "/admin/products" , icon:Package },
  { label: "Categories", href: "/admin/categories" , icon: Tag},
  { label: "Inventory", href: "/admin/inventory"  , icon: Boxes},
  { label: "Discounts", href: "/admin/discounts" , icon : Percent},
  { label: "Reports", href: "/admin/reports" , icon : FileBarChart},
];
