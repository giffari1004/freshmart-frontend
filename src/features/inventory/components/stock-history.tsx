import { Skeleton } from "@/components/ui/skeleton";
import { useGetStockHistory } from "../hooks";
import { Inventory, StockJournal } from "../schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface StockHistoryProps {
  inventory: Inventory | null;
  onClose: () => void;
}
export function StockHistory({ inventory, onClose }: StockHistoryProps) {
    const { data: historyData, isLoading } = useGetStockHistory(inventory?.id ?? "", {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    });
    if (!inventory) return null;
  return (
    <Dialog open={!!inventory} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[620px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Stock history
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {`${inventory.store.name} - ${inventory.product.name}`}
          </p>
        </DialogHeader>

        {isLoading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : historyData?.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No stock history found
          </p>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {historyData?.data?.map((journal: StockJournal) => (
              <div
                key={journal.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {journal.type === "IN" ? "Stock in + " : "Stock out - "}
                    {journal.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {journal.beforeStock} → {journal.afterStock}
                  </p>
                  {journal.notes && (
                    <p className="text-xs text-muted-foreground italic">
                      {journal.notes}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(journal.createdAt), "d MMM yyyy")}
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
