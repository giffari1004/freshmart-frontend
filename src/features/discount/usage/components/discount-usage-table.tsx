import { Inbox } from "lucide-react";
import { DiscountMeta, DiscountUsageRow } from "../constant";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/helper-idr";
import { PaginationMeta } from "@/lib/pagination";
import { format } from "date-fns";

interface DiscountUsageTableProps {
  usages: DiscountUsageRow[];
  meta?: DiscountMeta;
  onPageChange: (page: number) => void;
}
export function DiscountUsageTable({
  usages,
  meta,
  onPageChange,
}: DiscountUsageTableProps) {
  if (usages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">
          No discount usage found
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
              <TableHead>Discount type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Amount deducted</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usages.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-stone-900">
                  {item.userVoucherId ? "VOUCHER" : item.discount.type}
                </TableCell>
                <TableCell className="text-stone-700">
                  {item.user.name}
                </TableCell>
                <TableCell className="text-stone-700">
                  {item.order.orderNumber}
                </TableCell>
                <TableCell className="text-right text-stone-700">
                  {formatPrice(item.amountDeducted)}
                </TableCell>
                <TableCell className="text-stone-700">
                {format(new Date(item.createdAt), "d MMM yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {meta && onPageChange && (
        <div className="border-t border-stone-200">
          <PaginationMeta
            meta={meta}
            onPageChange={onPageChange}
            itemLabel="usage records"
          />
        </div>
      )}
    </div>
  );
}
