"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AdminUser } from "../schema";
import { RoleBadge } from "./role-badge";
export interface UsersTableProps {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  canManage: boolean;
}

export function UsersTable({
  users,
  onEdit,
  onDelete,
  canManage,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>StoreId</TableHead>
          <TableHead>List</TableHead>
          {canManage && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <RoleBadge role={user.role} />
            </TableCell>
            <TableCell>{user.storeId ?? "—"}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
            {canManage && (
              <TableCell>
                {user.role === "STORE_ADMIN" && (
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onEdit(user);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onDelete(user);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
