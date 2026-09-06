import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ProductMeta } from "../constans";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
  meta: ProductMeta;
  onPageChange: (page: number) => void;
}
export function ProductPagination({
  meta,
  onPageChange,
}: ProductPaginationProps) {
  const { page, limit, totalData, totalPages } = meta;
  if (totalData === 0) {
    return null;
  }
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalData);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  return (
    <div>
      Displaying {from}-{to} from {totalData}
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
