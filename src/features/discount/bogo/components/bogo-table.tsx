import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bogo } from "../schema";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface BogoTableProps {
  bogos: Bogo[];
  onEdit: (bogo: Bogo) => void;
  onDelete: (bogo: Bogo) => void;
}

export function BogoTable({ bogos, onEdit, onDelete }: BogoTableProps) {
  if (bogos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No BOGO promos found</p>
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
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bogos.map((bogo) => (
            <TableRow key={bogo.id}>
              <TableCell className="font-medium text-stone-900">{bogo.product.name}</TableCell>
              <TableCell className="text-stone-700">{bogo.store.name}</TableCell>
              <TableCell className="text-stone-700">{new Date(bogo.startDate).toLocaleDateString("id-ID")}</TableCell>
              <TableCell className="text-stone-700">{new Date(bogo.endDate).toLocaleDateString("id-ID")}</TableCell>
              <TableCell>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${bogo.isActive ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                  {bogo.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(bogo)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(bogo)}>Delete</DropdownMenuItem>
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