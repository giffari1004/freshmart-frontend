"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sprout } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../constans";
import { useAuthStore } from "@/stores/auth-store";

export function AdminSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.user?.role)
  const filterUiSideBar = ADMIN_NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role || "")
  )
  return (
    <aside className="w-60 shrink-0 border-r border-stone-200 bg-white">
      <div className="flex items-center gap-2 border-b border-stone-100 px-5 py-5">
        <Sprout className="size-5 text-emerald-700" />
        <span className="font-semibold text-stone-900">FreshMart Admin</span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {filterUiSideBar.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}