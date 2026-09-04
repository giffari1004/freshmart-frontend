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
    <section className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white/95 p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.28)] sm:p-5">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
          Find an order
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Search, filter, and sort your order history.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input
          value={query.orderNumber ?? ""}
          onChange={(event) =>
            onQueryChange({
              orderNumber: event.target.value || undefined,
            })
          }
          placeholder="Search order number"
          className="h-11 rounded-xl border border-border bg-background/60 px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-ring/20"
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
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
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
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
        />

        <input
          type="date"
          value={query.toDate ?? ""}
          onChange={(event) =>
            onQueryChange({
              toDate: event.target.value || undefined,
            })
          }
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
        />

        <select
          value={query.sortBy}
          onChange={(event) =>
            onQueryChange({
              sortBy: event.target.value as OrderListSortBy,
            })
          }
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
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
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </section>
  );
}
