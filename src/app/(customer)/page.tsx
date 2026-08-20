"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { LocationBanner } from "@/components/landing/location-banner";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { StoreInfoBar } from "@/components/landing/store-info-bar";
import { CategoryFilter } from "@/components/landing/category-filter";
import { ProductGrid } from "@/components/landing/product-grid";
import { SiteFooter } from "@/components/landing/site-footer";
import { useNearestStore } from "@/features/storefront/hooks";

export default function LandingPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { data: nearest } = useNearestStore();
  const storeId = nearest?.store.id ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LocationBanner />

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-6 md:px-8">
        <HeroCarousel />
        <StoreInfoBar />
        <CategoryFilter
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <ProductGrid storeId={storeId} categoryId={selectedCategoryId} />
      </main>

      <SiteFooter />
    </div>
  );
}
