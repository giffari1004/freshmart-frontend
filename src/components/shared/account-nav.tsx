"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNT_NAV_ITEMS = [
  { label: "Account Settings", href: "/profile", icon: User },
  { label: "My Addresses", href: "/addresses", icon: MapPin },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex gap-2 border-b border-border">
      {ACCOUNT_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
