"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useGetAllCategory } from "@/features/category/hooks";
import { Category } from "@/features/category/schema";
interface Props {
  search: string;
  categoryId: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}
export function ProductCatalogFilters({
  search,
  categoryId,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Props) {
  const debouncedSearch = useDebouncedCallback(onSearchChange, 400);
  const { data: categoryData } = useGetAllCategory({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <Input
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search products"
          className="h-11 rounded-2xl border-stone-200 pl-9"
        />
      </div>
      <Select value={categoryId || "all"} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-11 w-[180px] rounded-2xl border-stone-200">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categoryData?.data.map((category:Category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="h-11 w-[180px] rounded-2xl border-stone-200">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Newest</SelectItem>
          <SelectItem value="createdAt:asc">Oldest</SelectItem>
          <SelectItem value="name:asc">Name A-Z</SelectItem>
          <SelectItem value="name:desc">Name Z-A</SelectItem>
          <SelectItem value="basePrice:asc">Price low-high</SelectItem>
          <SelectItem value="basePrice:desc">Price high-low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}