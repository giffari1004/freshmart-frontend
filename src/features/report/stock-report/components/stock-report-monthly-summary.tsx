import { Skeleton } from "@/components/ui/skeleton";
import { useGetMonthSummary } from "../hooks";
import { Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataTypeGetMonthlySummary, MONTH_LABEL } from "../constant";

interface StockReportMonthlyDetailProps {
  storeId: string | undefined;
  year: number | undefined;
  month: number | undefined;
}
export function StockReportMonthlySummary({
  storeId,
  month,
  year,
}: StockReportMonthlyDetailProps) {
  const { data, isLoading } = useGetMonthSummary({ storeId, year, month });
  const summary = data ?? [];
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-stone-900">
        Monthly summary report
      </h2>
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : summary.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Inbox className="size-5 text-stone-400" />
          <p className="text-sm text-stone-400">
            No data for this period
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
                <TableHead>Product id</TableHead>
                <TableHead>Product name</TableHead>
                <TableHead className="text-right">Stock in</TableHead>
                <TableHead className="text-right">Stock out</TableHead>
                <TableHead className="text-right">After stock</TableHead>
                <TableHead className="text-right">Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((item: dataTypeGetMonthlySummary) => (
                <TableRow key={`${item.productId}-${item.month}`}>
                  <TableCell className="text-stone-700">
                    {item.productId}
                  </TableCell>
                  <TableCell className="font-medium text-stone-900">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.stockIn}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.stockOut}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.afterStock}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {MONTH_LABEL[new Date(item.month).getMonth()]}
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
