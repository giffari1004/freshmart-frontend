import { Skeleton } from "@/components/ui/skeleton";
import { dataTypeGetMonthlyReport, MONTH_LABEL } from "../constant";
import { useFetchMonthlyReport } from "../hooks";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatPrice } from "@/lib/helper-idr";

interface SalesMonthlyReportProps {
  storeId: string | undefined;
  year: number | undefined;
}
export function SalesMonthlyReport({ storeId, year }: SalesMonthlyReportProps) {
  const { data, isLoading } = useFetchMonthlyReport({ storeId, year });
  const grafikChartData = (data ?? []).map((item: dataTypeGetMonthlyReport) => ({
    month: MONTH_LABEL[new Date(item.month).getMonth()],
    totalSales: item.totalSales,
    totalOrder: item.totalOrders,
  }));
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-stone-900">
        Sales monthly report
      </h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : grafikChartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-stone-400">
          No sales data for this period
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={grafikChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
            />
            <Tooltip formatter={(value) => formatPrice(Number(value))} />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#047857"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
