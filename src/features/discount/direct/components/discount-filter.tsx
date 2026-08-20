"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DiscountFilterProps {
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
  activeOnly: boolean;
  onActiveOnlyChange: (value: boolean) => void;
}

const DUMMY_STORES = [
  { id: "1", name: "Toko Jakarta" },
  { id: "2", name: "Toko Bandung" },
];

export function DiscountFilter({ storeId, onStoreIdChange, activeOnly, onActiveOnlyChange }: DiscountFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <Select value={storeId ?? "all"} onValueChange={(val) => onStoreIdChange(val === "all" ? undefined : val)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All stores</SelectItem>
          {DUMMY_STORES.map((store) => (
            <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Checkbox id="activeOnly" checked={activeOnly} onCheckedChange={(v) => onActiveOnlyChange(!!v)} />
        <Label htmlFor="activeOnly" className="text-sm font-normal">Active only</Label>
      </div>
    </div>
  );
}