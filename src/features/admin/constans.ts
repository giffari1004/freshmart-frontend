import {
  Users,
  Package,
  Tag,
  Boxes,
  Percent,
  FileBarChart,
  Store,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { label: "Stores", href: "/admin/stores", roles: ["SUPER_ADMIN"], icon: Store },
  { label: "Users", href: "/admin/users", roles: ["SUPER_ADMIN"], icon: Users },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Discounts", href: "/admin/discounts", icon: Percent },
  { label: "Reports", href: "/admin/reports", icon: FileBarChart },
];