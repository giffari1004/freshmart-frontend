"use client";

import { Inbox } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PaginationMeta } from "@/lib/pagination";
import { useGetStockDetail } from "../hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StockDetailReportProps {
  storeId?: string;
  productId?: string;
  month: number;
  year: number;
  page: number;
  onPageChange: (page: number) => void;
}

export function StockDetailReport({
  storeId,
  productId,
  month,
  year,
  page,
  onPageChange,
}: StockDetailReportProps) {
  const { data, isLoading } = useGetStockDetail({
    storeId,
    productId,
    month,
    year,
    page,
    limit: 10,
  });

  const stock = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-stone-900">
        Stock Detail Report
      </h2>

      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : stock.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Inbox className="size-5 text-stone-400" />
          <p className="text-sm text-stone-400">No data for this period.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60">
                <TableHead>Product</TableHead>
                <TableHead>After</TableHead>
                <TableHead>Before</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {stock.map((item:any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="size-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-lg bg-stone-100">
                          <Inbox className="size-4 text-stone-300" />
                        </div>
                      )}
                      <span className="font-medium">{item.productName}</span>
                    </div>
                  </TableCell>

                  <TableCell>{item.afterStock}</TableCell>
                  <TableCell>{item.beforeStock}</TableCell>
                  <TableCell>
                    {format(new Date(item.createdAt), "d MMM yyyy")}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>

                  <TableCell>
                    <Badge
                      variant={item.type === "IN" ? "default" : "secondary"}
                    >
                      {item.type}
                    </Badge>
                  </TableCell>

                  <TableCell>{item.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {meta && (
            <div className="border-t border-stone-200">
              <PaginationMeta
                meta={meta}
                onPageChange={onPageChange}
                itemLabel="Stock histories"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}