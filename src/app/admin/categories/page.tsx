"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, getAllCategorySchema } from "@/features/category/schema";
import { useGetAllCategory } from "@/features/category/hooks";
import { CreateCategoryDialog } from "@/features/category/components/create-category-dialog";
import { CategoryFilters } from "@/features/category/components/category-filters";
import { CategoryTable } from "@/features/category/components/category-dialog-table";
import { CategoryPagination } from "@/features/category/components/category-pagination";
import { UpdateCategoryDialog } from "@/features/category/components/edit-category-dialog";
import { DeleteCategoryDialog } from "@/features/category/components/delete-category-dialog";
export default function AdminCategoriesPage() {
  const role = useAuthStore((s) => s.user?.role);
  const canManage = role === "SUPER_ADMIN";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategoryItem, setDeleteCategoryItem] = useState<Category | null>(
    null,
  );
  const [sortBy, sortOrder] = sort.split(":");
  const query: getAllCategorySchema = {
    page,
    limit: 10,
    search: search || undefined,
    sortBy: sortBy as getAllCategorySchema["sortBy"],
    sortOrder: sortOrder as getAllCategorySchema["sortOrder"],
  };
  const { data, isLoading } = useGetAllCategory(query);
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Product category management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Organize your product catalog into categories.
          </p>
        </div>
        {canManage && <CreateCategoryDialog />}
      </div>
      <CategoryFilters
        search={search}
        sort={sort}
        onSearchChange={(v) => {
          setSearch(v);
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
          <CategoryTable
            categories={data?.data ?? []}
            canManage={canManage}
            onEdit={setEditCategory}
            onDelete={setDeleteCategoryItem}
          />
          {data?.meta && (
            <CategoryPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}
      {canManage && (
        <>
          <UpdateCategoryDialog
            category={editCategory}
            onClose={() => setEditCategory(null)}
          />

          <DeleteCategoryDialog
            category={deleteCategoryItem}
            onClose={() => setDeleteCategoryItem(null)}
          />
        </>
      )}
    </div>
  );
}
