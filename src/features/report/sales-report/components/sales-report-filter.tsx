import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, YEARS } from "../constant";

interface SalesReportFilterProps {
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
  year: number | undefined;
  onYearChange: (value: number | undefined) => void;
  month: number | undefined;
  onMonthChange: (value: number | undefined) => void;
  canFilterStore: boolean;
}
const DUMMY_STORES = [
  { id: "store-1", name: "JAKARTA" },
  { id: "store-2", name: "BSD" },
];
export function SalesReportFilter({
  storeId,
  onStoreIdChange,
  year,
  onYearChange,
  month,
  onMonthChange,
  canFilterStore,
}: SalesReportFilterProps) {
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
      <Select
        value={month ? String(month) : "all"}
        onValueChange={(v) =>
          onMonthChange(v === "all" ? undefined : Number(v))
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="All months" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All months</SelectItem>
          {MONTHS.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={year ? String(year) : undefined}
        onValueChange={(v) => onYearChange(Number(v))}
      >
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="2026" />
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
