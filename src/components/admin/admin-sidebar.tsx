"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useProfile } from "@/features/profile/hooks";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Stores", href: "/admin/stores", icon: Store },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const {data: profile} = useProfile();

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 flex w-64 flex-col border-r bg-background p-4">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          FreshMart
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          Admin Portal
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatarUrl ?? undefined} alt={profile?.name ?? "Admin"} />
            <AvatarFallback>
              {profile?.name?.slice(0, 2).toUpperCase() ?? "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground">
              {profile?.name ?? "FreshMart Admin"}
            </span>
            <span className="text-xs text-muted-foreground">Super User</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
