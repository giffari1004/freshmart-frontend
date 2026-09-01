"use client"
import { Menu } from "lucide-react";
import { useAdminMobileBar } from "../admin-mobilebar";

export function AdminMobileBar() {
  const { toggle } = useAdminMobileBar();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 border-b border-stone-100 px-4 py-3 text-sm font-medium text-stone-700 md:hidden"
    >
      <Menu className="size-4" />
      Menu
    </button>
  );
}
