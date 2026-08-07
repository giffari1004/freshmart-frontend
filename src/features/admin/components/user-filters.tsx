"use client";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface UserFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}
export function UserFilter({
  search,
  role,
  sort,
  onSearchChange,
  onRoleChange,
  onSortChange, 
}: UserFilterProps) {
    const debouncedSearch = useDebouncedCallback(onSearchChange, 400);
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <Input
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search name or email"
          className="pl-9"
        />
      </div>
      <Select value={role || "all"} onValueChange={onRoleChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="CUSTOMER">Customer</SelectItem>
          <SelectItem value="STORE_ADMIN">Store admin</SelectItem>
          <SelectItem value="SUPER_ADMIN">Super admin</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
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
