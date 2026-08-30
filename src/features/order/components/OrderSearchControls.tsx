import type {
  OrderListQuery,
  OrderListSortBy,
  OrderListSortOrder,
  OrderListStatus,
} from "../order.type";

const STATUS_OPTIONS: Array<{
  label: string;
  value: OrderListStatus;
}> = [
  { label: "Waiting Payment", value: "WAITING_PAYMENT" },
  {
    label: "Waiting Payment Confirmation",
    value: "WAITING_CONFIRMATION",
  },
  { label: "Processed", value: "PROCESSED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS: Array<{
  label: string;
  value: OrderListSortBy;
}> = [
  { label: "Newest", value: "createdAt" },
  { label: "Total Amount", value: "totalAmount" },
  { label: "Order Number", value: "orderNumber" },
  { label: "Status", value: "status" },
];

interface Props {
  query: OrderListQuery;
  onQueryChange: (changes: Partial<OrderListQuery>) => void;
}

export function OrderSearchControls({
  query,
  onQueryChange,
}: Props) {
  return (
    <div className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <input
        value={query.orderNumber ?? ""}
        onChange={(event) =>
          onQueryChange({
            orderNumber: event.target.value || undefined,
          })
        }
        placeholder="Search order number"
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      />

      <select
        value={query.status ?? ""}
        onChange={(event) =>
          onQueryChange({
            status: event.target.value
              ? (event.target.value as OrderListStatus)
              : undefined,
          })
        }
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      >
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={query.fromDate ?? ""}
        onChange={(event) =>
          onQueryChange({
            fromDate: event.target.value || undefined,
          })
        }
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      />

      <input
        type="date"
        value={query.toDate ?? ""}
        onChange={(event) =>
          onQueryChange({
            toDate: event.target.value || undefined,
          })
        }
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      />

      <select
        value={query.sortBy}
        onChange={(event) =>
          onQueryChange({
            sortBy: event.target.value as OrderListSortBy,
          })
        }
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={query.sortOrder}
        onChange={(event) =>
          onQueryChange({
            sortOrder: event.target.value as OrderListSortOrder,
          })
        }
        className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none focus:border-emerald-600"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
