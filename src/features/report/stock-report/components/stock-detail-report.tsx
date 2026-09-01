  import { Inbox } from "lucide-react";
  import { useGetStockDetail } from "../hooks";
  import { Skeleton } from "@/components/ui/skeleton";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { dataTypeGetStockDetail } from "../constant";

  interface StockDetailReportProps {
    storeId: string | undefined;
    productId: string | undefined;
    month: number;
    year: number;
  }
  export function StockDetailReport({
    storeId,
    productId,
    month,
    year,
  }: StockDetailReportProps) {
    const { data, isLoading } = useGetStockDetail({
      storeId,
      productId,
      month,
      year,
    });
    const stock = data ?? [];
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-stone-900">
          Stock detail report
        </h2>
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-xl"/>
        ) : stock.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <Inbox className="size-5 text-stone-400"/>
            <p className="text-sm text-stone-400">No data for this period</p>
          </div>
        ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
                <TableHead>Product name</TableHead>
                <TableHead>After stock</TableHead>
                <TableHead>Before stock</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item: dataTypeGetStockDetail) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-stone-900">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.afterStock}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.beforeStock}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.createdAt}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.type}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {item.notes}
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
