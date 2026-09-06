import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProductReport } from "../hooks";
import { Inbox } from "lucide-react";
import { formatPrice } from "@/lib/helper-idr";
import { MONTH_LABEL } from "../constant";

interface SalesProductReportProps {
  storeId: string | undefined;
  year: number | undefined;
  month: number | undefined;
}
export function SalesProductReport({
  storeId,
  year,
  month,
}: SalesProductReportProps) {
  const { data, isLoading } = useFetchProductReport({ storeId, year, month });
  const products = data ?? [];
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-stone-900">
        Top products
      </h2>
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Inbox className="size-5 text-stone-400" />
          <p className="text-sm text-stone-400">
            No product data for this period
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity sold</TableHead>
                <TableHead className="text-right">Total sales</TableHead>
                <TableHead className="text-right">Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((item)=> (
                    <TableRow key={`${item.productId}-${item.month}`}> 
                        <TableCell className="font-medium text-stone-900">
                            {item.productName}
                        </TableCell>
                        <TableCell className="text-right text-stone-700">
                            {item.quantitySold}
                        </TableCell>
                        <TableCell className="text-right text-stone-700">
                            {formatPrice(item.totalSales)}
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
