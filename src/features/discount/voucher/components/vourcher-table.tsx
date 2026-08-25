import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Voucher } from "../schema";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/helper-idr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VoucherTableProps {
  vouchers: Voucher[];
  onEdit: (voucher: Voucher) => void;
  onDelete: (voucher: Voucher) => void;
}

export function VoucherTable({ vouchers, onEdit, onDelete }: VoucherTableProps) {
  if (vouchers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No vouchers found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Code</TableHead>
            <TableHead>Usage Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Max Discount</TableHead>
            <TableHead>Expired At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell className="font-medium text-stone-900">
                {voucher.code}
              </TableCell>
              <TableCell className="text-stone-700">
                {voucher.usageType.replace("_", " ")}
              </TableCell>
              <TableCell className="text-stone-700">
                {voucher.valueType === "PERCENTAGE"
                  ? `${voucher.value}%`
                  : formatPrice(voucher.value)}
              </TableCell>
              <TableCell className="text-stone-700">
                {voucher.maxDiscountAmount
                  ? formatPrice(voucher.maxDiscountAmount)
                  : "-"}
              </TableCell>
              <TableCell className="text-stone-700">
                {new Date(voucher.expiredAt).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={voucher.isActive ? "default" : "secondary"}
                  className={voucher.isActive ? "bg-green-700" : ""}
                >
                  {voucher.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(voucher)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(voucher)}>
                      Delete
                    </DropdownMenuItem>
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