"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStores } from "@/features/store/hooks";
interface DiscountFilterProps {
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
}
export function DiscountFilter({
  storeId,
  onStoreIdChange,
}: DiscountFilterProps) {
  const { data: storesData } = useStores({ page: 1, limit: 50 });
  const stores = storesData?.data ?? [];
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <Select
        value={storeId ?? "all"}
        onValueChange={(val) =>
          onStoreIdChange(val === "all" ? undefined : val)
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All stores</SelectItem>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
