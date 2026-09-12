import type { ReactNode } from "react";
import type {
  OrderListQuery,
  OrderListSortBy,
  OrderListSortOrder,
  OrderListStatus,
} from "../order.type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS: Array<{ label: string; value: OrderListStatus }> = [
  { label: "Waiting Payment", value: "WAITING_PAYMENT" },
  { label: "Paid", value: "PAID" },
  { label: "Processed", value: "PROCESSED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS: Array<{ label: string; value: OrderListSortBy }> = [
  { label: "Newest", value: "createdAt" },
  { label: "Total Amount", value: "totalAmount" },
  { label: "Order Number", value: "orderNumber" },
  { label: "Status", value: "status" },
];

interface Props {
  query: OrderListQuery;
  onQueryChange: (changes: Partial<OrderListQuery>) => void;
}

export function OrderSearchControls({ query, onQueryChange }: Props) {
  return (
    <section className="rounded-xl border border-border bg-background p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">Find an order</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Search, filter, and sort your order history.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Order number">
          <Input
            value={query.orderNumber ?? ""}
            onChange={(event) =>
              onQueryChange({ orderNumber: event.target.value || undefined })
            }
            placeholder="Search order number"
          />
        </Field>
        <Field label="Status">
          <Select
            value={query.status ?? "ALL"}
            onValueChange={(value) =>
              onQueryChange({
                status:
                  value === "ALL" ? undefined : (value as OrderListStatus),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <DateField
          label="From date"
          value={query.fromDate}
          onChange={(fromDate) => onQueryChange({ fromDate })}
        />
        <DateField
          label="To date"
          value={query.toDate}
          onChange={(toDate) => onQueryChange({ toDate })}
        />
        <Field label="Sort by">
          <Select
            value={query.sortBy}
            onValueChange={(sortBy) =>
              onQueryChange({ sortBy: sortBy as OrderListSortBy })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Order">
          <Select
            value={query.sortOrder}
            onValueChange={(sortOrder) =>
              onQueryChange({ sortOrder: sortOrder as OrderListSortOrder })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value?: string) => void;
}) {
  return (
    <Field label={label}>
      <Input
        type="date"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || undefined)}
      />
    </Field>
  );
}
