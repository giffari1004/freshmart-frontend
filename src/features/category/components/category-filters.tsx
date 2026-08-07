"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CategoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}
export function CategoryFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: CategoryFiltersProps) {
  const debouncedSearch = useDebouncedCallback(onSearchChange, 400);
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <Input
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search name"
          className="pl-9"
        />
      </div>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Newest</SelectItem>
          <SelectItem value="createdAt:asc">Oldest</SelectItem>
          <SelectItem value="name:asc">Name A-Z</SelectItem>
          <SelectItem value="name:desc">Name Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
