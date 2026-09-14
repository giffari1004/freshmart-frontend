import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStores } from "@/features/store/hooks";

interface DiscountUsageFilterProps {
  storeId: string | undefined;
  onStoreIdChange: (value: string | undefined) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  canFilterStore: boolean;
}
export function DiscountUsageFilter({
  storeId,
  onStoreIdChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  canFilterStore,
}: DiscountUsageFilterProps) {
  const { data: StoresData } = useStores({ page: 1, limit: 20 });
  const stores = StoresData?.data ?? [];
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
            {stores.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Input
        type="date"
        className="w-full sm:w-40"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        placeholder="Start date"
      />
      <Input
        type="date"
        className="w-full sm:w-40"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        placeholder="End date"
      />
    </div>
  );
}
