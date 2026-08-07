"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGrid } from "@/features/product/public/components/product-grid";
import { ProductCatalogFilters } from "@/features/product/public/components/product-catalog-filters";
import { ProductPagination } from "@/features/product/public/components/product-pagination";
import { useGetProducts } from "@/features/product/public/hooks";
import { getProductCatalogSchema } from "@/features/product/public/schema";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("createdAt:desc");

  const [sortBy, sortOrder] = sort.split(":");

  const query: getProductCatalogSchema = {
    page,
    limit: 12,
    search: search || undefined,
    categoryId: categoryId || undefined,
    storeId: "isinantijanganlupa",
    sortBy: sortBy as getProductCatalogSchema["sortBy"],
    sortOrder: sortOrder as getProductCatalogSchema["sortOrder"],
  };
  const { data, isLoading } = useGetProducts(query);
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            FreshMart Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            Discover fresh products
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
            Browse fruits, vegetables, dairy, snacks, and other fresh products
            carefully selected for your daily needs
          </p>
        </div>

        <ProductCatalogFilters
          search={search}
          categoryId={categoryId}
          sort={sort}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          onCategoryChange={(v) => {
            setCategoryId(v === "all" ? "" : v);
            setPage(1);
          }}
          onSortChange={(v) => {
            setSort(v);
            setPage(1);
          }}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-3xl" />
            ))}
          </div>
        ) : (
          <>
            <ProductGrid products={data?.data ?? []} />

            {data?.meta && (
              <ProductPagination meta={data.meta} onPageChange={setPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
