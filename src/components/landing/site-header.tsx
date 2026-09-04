"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBasket, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useProfile } from "@/features/profile/hooks";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const router = useRouter()
  const itemCount = useCartStore((state) => state.itemCount);
  const isLoggedIn = useAuthStore((state) => !!state.accessToken);
  const { data: profile } = useProfile({ enabled: isLoggedIn });
  const [searchValue, setSearchValue] = useState("");

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";
  
  const handleSearch = (e: React.FormEvent)=> {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 shadow-sm md:px-8">
      <Link href="/" className="flex shrink-0 items-center gap-3">
        <Image
          src="/images/logo-freshmart.png"
          alt="FreshMart"
          width={50}
          height={50}
          className="h-9 w-9 object-contain"
        />
        <span className="hidden text-xl font-bold text-primary sm:inline">
          FreshMart
        </span>
      </Link>

      <form
        onSubmit={handleSearch}
        className="mx-4 max-w-2xl flex-1 px-2 md:px-8"
      >
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search fresh groceries, organic milk, fruits..."
            className="rounded-full bg-muted pl-11"
          />
        </div>
      </form>

      <nav className="flex items-center gap-1">
        <Link
          href={isLoggedIn ? "/profile" : "/login"}
          className="flex flex-col items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted active:scale-95"
        >
          {isLoggedIn ? (
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={profile?.avatarUrl || undefined}
                alt={profile?.name ?? "Account"}
              />
              <AvatarFallback className="text-[9px] font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="hidden text-xs font-medium sm:inline">Account</span>
        </Link>
        <Link
          href="/orders"
          className="flex flex-col items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted active:scale-95"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="hidden text-xs font-medium sm:inline">Orders</span>
        </Link>
        <Link
          href="/cart"
          className="relative flex flex-col items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted active:scale-95"
        >
          <ShoppingBasket className="h-5 w-5" />
          <span className="hidden text-xs font-medium sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
