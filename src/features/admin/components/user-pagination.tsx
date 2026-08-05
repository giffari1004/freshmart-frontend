"use client";
import { UsersMeta } from "../schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
export interface UserPaginationProps {
  meta: UsersMeta;
  onPageChange: (page: number) => void;
}

export function UserPagination({ meta, onPageChange }: UserPaginationProps) {
  const { page, limit, totalData, totalPages } = meta;
  if (totalData === 0) {
    return <p>No data</p>;
  }
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalData);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  return (
    <div>
      <p>
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
