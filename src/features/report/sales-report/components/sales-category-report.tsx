import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchCategoryReport } from "../hooks";
import { MONTH_LABEL } from "../constant";
import { Inbox } from "lucide-react";
import { formatPrice } from "@/lib/helper-idr";

interface SalesCategoryReportProps {
  storeId: string | undefined;
  year: number | undefined;
  month: number | undefined;
}
export function SalesCategoryReport({ storeId, year, month }: SalesCategoryReportProps) {
  const { data, isLoading } = useFetchCategoryReport({ storeId, year, month });
  const categories = data ?? [];
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-stone-900">Top categories</h2>
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Inbox className="size-5 text-stone-400" />
          <p className="text-sm text-stone-400">No category data for this period</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
                <TableHead>Month</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((item) => (
                <TableRow key={`${item.categoryId}-${item.month}`}>
                  <TableCell className="text-stone-700">
                    {MONTH_LABEL[new Date(item.month).getMonth()]}
                  </TableCell>
                  <TableCell className="font-medium text-stone-900">
                    {item.categoryName}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {formatPrice(item.totalSales)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}