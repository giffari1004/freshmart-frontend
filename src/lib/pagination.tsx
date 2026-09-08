import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "./utils";
interface PaginationMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}
interface PaginationMetaProps {
  meta: PaginationMeta;
  onPageChange: (value: number) => void;
  itemLabel: string;
}
export function PaginationMeta({
  meta,
  onPageChange,
  itemLabel,
}: PaginationMetaProps) {
  const { page, limit, totalData, totalPages } = meta;
  if (totalData === 0) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalData);
  return (
    <div className="flex flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row">
      <p className="text-sm text-stone-500">
        Showing
        <span className="font-medium text-stone-900">
          {from}-{to}
        </span>
        of <span className="font-medium text-stone-900">{totalData}</span>
        {itemLabel}
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && onPageChange(page - 1)}
              className={cn(page <= 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && onPageChange(page + 1)}
              className={cn(
                page >= totalPages && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
