"use client";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Inbox } from "lucide-react";
import { Category } from "../schema";
interface CategoryTableProps {
  categories: Category[];
  canManage: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}
export function CategoryTable({
  categories,
  canManage,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">
          No categories found
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            {canManage && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium text-stone-900">
                {category.name}
              </TableCell>
              <TableCell className="text-stone-500">
                {format(new Date(category.createdAt), "d MMM yyyy")}
              </TableCell>
              {canManage && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(category)}
                      aria-label={`Edit ${category.name}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(category)}
                      aria-label={`Delete ${category.name}`}
                    >
                      <Trash2 className="size-4 text-rose-500" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
