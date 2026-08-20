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
import { VOUCHER_USAGE_TYPE, VOUCHER_VALUE_TYPE } from "../constant";
import { VoucherUsageType, VoucherValueType } from "../constant";

interface VoucherFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  usageType: string | undefined;
  onUsageTypeChange: (value: string | undefined) => void;
  valueType: string | undefined;
  onValueTypeChange: (value: string | undefined) => void;
  isActive: boolean | undefined;
  onIsActiveChange: (value: boolean | undefined) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export function VoucherFilter({
  search,
  onSearchChange,
  usageType,
  onUsageTypeChange,
  valueType,
  onValueTypeChange,
  isActive,
  onIsActiveChange,
  sort,
  onSortChange,
}: VoucherFilterProps) {
  const debounceSearch = useDebouncedCallback(onSearchChange, 400);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <Input
          defaultValue={search}
          placeholder="Search voucher code"
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>

      <Select
        value={usageType ?? "all"}
        onValueChange={(val) =>
          onUsageTypeChange(val === "all" ? undefined : val)
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Usage type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All usage types</SelectItem>
          {VOUCHER_USAGE_TYPE.map((type: VoucherUsageType) => (
            <SelectItem key={type} value={type}>
              {type.replace("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={valueType ?? "all"}
        onValueChange={(val) =>
          onValueTypeChange(val === "all" ? undefined : val)
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Value type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All value types</SelectItem>
          {VOUCHER_VALUE_TYPE.map((type: VoucherValueType) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={isActive === undefined ? "all" : String(isActive)}
        onValueChange={(val) =>
          onIsActiveChange(val === "all" ? undefined : val === "true")
        }
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Newest</SelectItem>
          <SelectItem value="createdAt:asc">Oldest</SelectItem>
          <SelectItem value="expiredAt:asc">Expiring soon</SelectItem>
          <SelectItem value="expiredAt:desc">Expiring last</SelectItem>
          <SelectItem value="value:desc">Value: High to Low</SelectItem>
          <SelectItem value="value:asc">Value: Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
