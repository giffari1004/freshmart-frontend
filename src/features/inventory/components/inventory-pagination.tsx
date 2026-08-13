import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { InventoryMeta } from "../schema";
import { cn } from "@/lib/utils";

interface InventoryPaginationProps {
  meta: InventoryMeta;
  onPageChange: (page: number) => void;
}
export function InventoryPagination({
  meta,
  onPageChange,
}: InventoryPaginationProps) {
  const { page, limit, totalData, totalPages } = meta;
  if (totalData === 0) {
    return <p>No data</p>;
  }
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalData);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm text-muted-foreground">
        Displaying {from}-{to} from {totalData}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && onPageChange(page - 1)}
              className={cn(isPrevDisabled && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && onPageChange(page + 1)}
              className={cn(isNextDisabled && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
