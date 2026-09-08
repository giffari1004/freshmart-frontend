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
  sort,
  onSortChange,
}: VoucherFilterProps) {
  const debounceSearch = useDebouncedCallback(onSearchChange, 400);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
      <div className="relative min-w-[200px] flex-1">
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
    </div>
  );
}
