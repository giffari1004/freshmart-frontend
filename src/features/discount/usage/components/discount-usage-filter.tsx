import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { data: storesData } = useStores({
    page: 1,
    limit: 20,
  });

  const stores = storesData?.data ?? [];

  const selectedStoreId = storeId || "all";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3 sm:flex-row sm:items-center">
      {canFilterStore && (
        <Select
          value={selectedStoreId}
          onValueChange={(value) => {
            onStoreIdChange(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Store" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Store</SelectItem>

            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Input
        type="date"
        className="w-full sm:w-40"
        value={startDate || ""}
        onChange={(event) => {
          onStartDateChange(event.target.value);
        }}
        aria-label="Start date"
      />

      <Input
        type="date"
        className="w-full sm:w-40"
        value={endDate || ""}
        onChange={(event) => {
          onEndDateChange(event.target.value);
        }}
        min={startDate || undefined}
        aria-label="End date"
      />
    </div>
  );
}