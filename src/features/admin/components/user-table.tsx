"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Inbox, Pencil, Trash2 } from "lucide-react";
import { AdminUser } from "../schema";
import { RoleBadge } from "./role-badge";
import { PaginationMeta } from "@/lib/pagination";

export interface UsersTableProps {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  meta?: { page: number; limit: number; totalData: number; totalPages: number };
  onPageChange?: (value: number) => void;
}
export function UsersTable({
  users,
  onEdit,
  onDelete,
  meta,
  onPageChange,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
        <Inbox className="size-5 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">No users found</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>StoreId</TableHead>
            <TableHead>List</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={user.avatarUrl ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-stone-900">
                    {user.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>{user.storeId ?? "—"}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                {user.role === "STORE_ADMIN" && (
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user)}
                    >
                      <Trash2 className="size-4 text-rose-500" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && onPageChange && (
        <div className="border-t border-stone-200">
          <PaginationMeta
            meta={meta}
            onPageChange={onPageChange}
            itemLabel="Users"
          />
        </div>
      )}
    </div>
  );
}
