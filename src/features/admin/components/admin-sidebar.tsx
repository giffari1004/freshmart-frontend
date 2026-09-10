"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut, X } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../constans";
import { useAuthStore } from "@/stores/auth-store";
import { useAdminMobileBar } from "../admin-mobilebar";

export function AdminSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.user?.role);
  const filterUiSideBar = ADMIN_NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role || ""),
  );
  const { isOpen, close } = useAdminMobileBar();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={close}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto",
          "border-r border-stone-200 bg-white shadow-sm transition-transform duration-200",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-stone-200 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            FreshMart
          </p>
          <h2 className="mt-1 text-lg font-bold text-stone-900">
            Admin Management
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            Dashboard & administration panel
          </p>
        </div>
        <nav className="space-y-1 p-3">
          {filterUiSideBar.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
                )}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
