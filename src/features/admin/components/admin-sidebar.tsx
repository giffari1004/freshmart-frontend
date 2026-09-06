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
          "fixed inset-y-0 left-0 z-50 w-60 shrink-0 overflow-y-auto border-r border-stone-200 bg-white transition-transform duration-200",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b-1 border-b-emerald-900 border-stone-100 px-5 py-5">
          <span className="font-semibold text-stone-900">Admin Management</span>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              title="Close from admin management page"
              className="rounded-md p-1 text-stone-400 hover:bg-stone-50 hover:text-stone-700"
            >
              <LogOut className="size-4" />
            </Link>
            <button onClick={close} className="md:hidden">
              <X className="size-5 text-stone-500" />
            </button>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {filterUiSideBar.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
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
                {Icon && <Icon className="size-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
