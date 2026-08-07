"use client";

import { Inbox, Pencil, Trash2 } from "lucide-react";
import { Product } from "../schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
interface ProductTableProps {
  products: Product[];
  canManage: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}
function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
export function ProductTable({
  products,
  canManage,
  onDelete,
  onEdit,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No products found</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Created</TableHead>
            {canManage && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const primaryImage =
              product.images.find((img) => img.isPrimary) ?? product.images[0];
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {primaryImage ? (
                      <img
                        src={primaryImage.imageUrl}
                        alt={product.name}
                        className="size-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-lg bg-stone-100 text-stone-300">
                        <Inbox className="size-4" />
                      </div>
                    )}
                    <span className="font-medium text-stone-900">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-stone-500">
                  {formatPrice(product.basePrice)}
                </TableCell>
                <TableCell className="text-stone-500">
                  {product.weight}g
                </TableCell>
                <TableCell className="text-stone-500">
                  {format(new Date(product.createdAt), "d MMM yyyy")}
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(product)}
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="size-4 text-rose-500" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
