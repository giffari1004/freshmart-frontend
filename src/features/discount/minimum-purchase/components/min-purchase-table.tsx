import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MinPurchaseDiscount } from "../schema";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper-idr";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MinPurchaseTableProps {
  discounts: MinPurchaseDiscount[];
  onEdit: (discount: MinPurchaseDiscount) => void;
  onDelete: (discount: MinPurchaseDiscount) => void;
}

export function MinPurchaseTable({ discounts, onEdit, onDelete }: MinPurchaseTableProps) {
  if (discounts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No discounts found</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Product</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Min. Purchase</TableHead>
            <TableHead>Max Discount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium text-stone-900">
                {discount.product?.name ?? "All products"}
              </TableCell>
              <TableCell className="text-stone-700">{discount.store.name}</TableCell>
              <TableCell className="text-stone-700">
                {discount.valueType === "PERCENTAGE" ? `${discount.value}%` : formatPrice(discount.value)}
              </TableCell>
              <TableCell className="text-stone-700">{formatPrice(discount.minPurchaseAmount)}</TableCell>
              <TableCell className="text-stone-700">
                {discount.maxDiscountAmount ? formatPrice(discount.maxDiscountAmount) : "-"}
              </TableCell>
              <TableCell>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${discount.isActive ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                  {discount.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(discount)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(discount)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}