import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ProductMeta } from "../../schema";
interface Props {
  meta: ProductMeta;
  onPageChange: (page: number) => void;
}

export function ProductPagination({ meta, onPageChange }: Props) {
  const { page, limit, totalData, totalPages } = meta;

  if (totalData === 0) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalData);

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row">
      <p className="text-sm text-stone-500">
        Showing{" "}
        <span className="font-medium text-stone-900">
          {from}-{to}
        </span>{" "}
        of <span className="font-medium text-stone-900">{totalData}</span>{" "}
        products
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
            <PaginationLink isActive className="rounded-xl">
              {page}
            </PaginationLink>
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
