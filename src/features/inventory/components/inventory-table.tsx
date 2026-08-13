import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inventory } from "../schema";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper-idr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InventoryTableProps {
  inventories: Inventory[];
  canManageInventory: boolean;
  canManageStock: boolean;
  onEdit: (inventory: Inventory) => void;
  onDelete: (inventory: Inventory) => void;
  onStockIn: (inventory: Inventory) => void;
  onStockOut: (inventory: Inventory) => void;
  onHistory: (inventory: Inventory) => void;
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
          {inventories.map((inventory) => (
            <TableRow key={inventory.id}>
              <TableCell className="font-medium text-stone-900">
                {inventory.product.name}
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
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManageStock && (
                        <DropdownMenuItem onClick={() => onStockIn(inventory)}>
                          Stock In
                        </DropdownMenuItem>
                      )}
                      {canManageStock && (
                        <DropdownMenuItem onClick={() => onStockOut(inventory)}>
                          Stock Out
                        </DropdownMenuItem>
                      )}
                      {canManageInventory && (
                        <DropdownMenuItem onClick={() => onEdit(inventory)}>
                          Edit
                        </DropdownMenuItem>
                      )}
                      {canManageInventory && (
                        <DropdownMenuItem onClick={() => onDelete(inventory)}>
                          Delete
                        </DropdownMenuItem>
                      )}
                      {canManageStock && (
                        <DropdownMenuItem onClick={() => onHistory(inventory)}>
                          History
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
