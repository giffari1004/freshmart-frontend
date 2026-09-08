import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inventory } from "../schema";
import {
  History,
  Inbox,
  MoreVertical,
  PackageMinus,
  PackagePlus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper-idr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationMeta } from "@/lib/pagination";

interface InventoryTableProps {
  inventories: Inventory[];
  canManageInventory: boolean;
  canManageStock: boolean;
  onEdit: (inventory: Inventory) => void;
  onDelete: (inventory: Inventory) => void;
  onStockIn: (inventory: Inventory) => void;
  onStockOut: (inventory: Inventory) => void;
  onHistory: (inventory: Inventory) => void;
  meta?: { page: number; limit: number; totalData: number; totalPages: number };
  onPageChange?: (value: number) => void;
}
export function InventoryTable({
  inventories,
  canManageInventory,
  canManageStock,
  onDelete,
  onEdit,
  onStockIn,
  onStockOut,
  onHistory,
  meta,
  onPageChange,
}: InventoryTableProps) {
  if (inventories.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">
          No inventories found
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Product Name</TableHead>
            <TableHead>Store Name</TableHead>
            <TableHead>Stock Quantity</TableHead>
            <TableHead>Price Override</TableHead>
            {canManageStock && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventories.map((inventory) => {
            const primaryImage =
              inventory.product.images.find((img) => img.isPrimary) ??
              inventory.product.images[0];
            return (
              <TableRow key={inventory.id}>
                <TableCell className="font-medium text-stone-900">
                  <div className="flex items-center gap-3">
                    {primaryImage ? (
                      <img
                        src={primaryImage.imageUrl}
                        alt={inventory.product.name}
                        className="size-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-lg bg-stone-100 text-stone-300">
                        <Inbox className="size-4" />
                      </div>
                    )}
                    <span className="font-medium text-stone-900">
                      {inventory.product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-stone-900">
                  {inventory.store.name}
                </TableCell>
                <TableCell className="font-medium text-stone-900">
                  {inventory.stockQuantity}
                </TableCell>
                <TableCell className="font-medium text-stone-900">
                  {inventory.priceOverride
                    ? formatPrice(inventory.priceOverride)
                    : "-"}
                </TableCell>
                {canManageStock && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {canManageStock && (
                          <DropdownMenuItem
                            onClick={() => onStockIn(inventory)}
                          >
                            <PackagePlus className="mr-2 h-4 w-4" /> Stock In
                          </DropdownMenuItem>
                        )}
                        {canManageStock && (
                          <DropdownMenuItem
                            onClick={() => onStockOut(inventory)}
                          >
                            <PackageMinus className="mr-2 h-4 w-4" /> Stock Out
                          </DropdownMenuItem>
                        )}
                        {canManageInventory && (
                          <DropdownMenuItem onClick={() => onEdit(inventory)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        )}
                        {canManageInventory && (
                          <DropdownMenuItem
                            onClick={() => onDelete(inventory)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        )}
                        {canManageStock && (
                          <DropdownMenuItem
                            onClick={() => onHistory(inventory)}
                          >
                            <History className="mr-2 h-4 w-4" /> History
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {meta && onPageChange && (
        <div className="border-t border-stone-200">
          <PaginationMeta
            meta={meta}
            onPageChange={onPageChange}
            itemLabel="Inventories"
          />
        </div>
      )}
    </div>
  );
}
