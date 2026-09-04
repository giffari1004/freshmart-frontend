"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateProduct } from "@/features/product/components/create-product";
import { DeleteProduct } from "@/features/product/components/dekete-product";
import { UpdateProduct } from "@/features/product/components/edit-product";
import { ProductFilters } from "@/features/product/components/product-filters";
import { ProductPagination } from "@/features/product/components/product-pagination";
import { ProductTable } from "@/features/product/components/product-table";
import { useGetAllProduct } from "@/features/product/hooks";
import { getAllProductSchema } from "@/features/product/schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { Product } from "@/features/product/constans";
export default function AdminProductsPage() {
  const role = useAuthStore((s) => s.user?.role);
  const canManage = role === "SUPER_ADMIN";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [categoryId, setCategoryId] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductitem, setDeleteProduct] = useState<Product | null>(null);
  const [sortBy, sortOrder] = sort.split(":");
  const query: getAllProductSchema = {
    page,
    limit: 10,
    search: search || undefined,
    categoryId: categoryId || undefined,
    sortBy: sortBy as getAllProductSchema["sortBy"],
    sortOrder: sortOrder as getAllProductSchema["sortOrder"],
  };
  const { data, isLoading } = useGetAllProduct(query);
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Product management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Products</h1>
          <p className="mt-1 text-sm text-stone-500">Organize Product Store</p>
        </div>
        {canManage && <CreateProduct />}
      </div>
      <ProductFilters
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
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <>
          <ProductTable
            products={data?.data ?? []}
            canManage={canManage}
            onEdit={setEditProduct}
            onDelete={setDeleteProduct}
          />
          {data?.meta && (
            <ProductPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}
      {canManage && (
        <>
          <UpdateProduct
            product={editProduct}
            onClose={() => setEditProduct(null)}
          />
          <DeleteProduct
            product={deleteProductitem}
            onClose={() => setDeleteProduct(null)}
          />
        </>
      )}
    </div>
  );
}
