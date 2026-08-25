import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Discount } from "../schema";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper-idr";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DiscountTableProps {
  discounts: Discount[];
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
}

export function DiscountTable({ discounts, onEdit, onDelete }: DiscountTableProps) {
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
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium text-stone-900">{discount.product.name}</TableCell>
              <TableCell className="text-stone-700">{discount.store.name}</TableCell>
              <TableCell className="text-stone-700">
                {discount.valueType === "PERCENTAGE" ? `${discount.value}%` : formatPrice(discount.value)}
              </TableCell>
              <TableCell className="text-stone-700">{new Date(discount.startDate).toLocaleDateString("id-ID")}</TableCell>
              <TableCell className="text-stone-700">{new Date(discount.endDate).toLocaleDateString("id-ID")}</TableCell>
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