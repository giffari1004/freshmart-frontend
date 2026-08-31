"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";

// TODO: ganti ke useGetAllStores() kalau modul Store (Gifari) udah selesai
const DUMMY_STORES = [
  { id: "dummy-store-id-1", name: "Toko Jakarta (Dummy)" },
  { id: "dummy-store-id-2", name: "Toko Bandung (Dummy)" },
];
interface InventoryFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
  sort: string;
  onSortChange: (value: string) => void;
  showStoreFilter: boolean;
}
export function InventoryFilter({
  search,
  onSearchChange,
  storeId,
  onStoreIdChange,
  sort,
  onSortChange,
  showStoreFilter,
}: InventoryFilterProps) {
  const debounceSearch = useDebouncedCallback(onSearchChange, 400);
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <div className="relative min-w-[220px] flex-1 ">
        <Input
          defaultValue={search}
          placeholder="Search product"
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
      {showStoreFilter && (
        <Select
          value={storeId ?? "all"}
          onValueChange={(val) =>
            onStoreIdChange(val === "all" ? undefined : val)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stores</SelectItem>
            {DUMMY_STORES.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Newest</SelectItem>
          <SelectItem value="createdAt:asc">Oldest</SelectItem>
          <SelectItem value="stockQuantity:desc">Stock: High to Low</SelectItem>
          <SelectItem value="stockQuantity:asc">Stock: Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
