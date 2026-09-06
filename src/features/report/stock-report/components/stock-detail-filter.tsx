"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, YEARS } from "../constant";
import { ProductComboBox } from "./product-combobox";

interface StockDetailFilterProps {
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
  productId: string | undefined;
  onProductIdChange: (value: string | undefined) => void;
  year: number;
  onYearChange: (value: number) => void;
  month: number;
  onMonthChange: (value: number) => void;
  canFilterStore: boolean;
}

const DUMMY_STORES = [
  { id: "store-1", name: "JAKARTA" },
  { id: "store-2", name: "BSD" },
];

export function StockDetailFilter({
  storeId,
  onStoreIdChange,
  productId,
  onProductIdChange,
  year,
  onYearChange,
  month,
  onMonthChange,
  canFilterStore,
}: StockDetailFilterProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-3 sm:flex-row sm:items-center sm:gap-3">
      {canFilterStore && (
        <Select
          value={storeId ?? "all"}
          onValueChange={(v) => onStoreIdChange(v === "all" ? undefined : v)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All stores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Store</SelectItem>
            {DUMMY_STORES.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <ProductComboBox productId={productId} onProductIdChange={onProductIdChange} />
      <Select value={String(month)} onValueChange={(v) => onMonthChange(Number(v))}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}