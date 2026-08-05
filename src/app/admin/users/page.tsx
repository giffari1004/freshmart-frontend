"use client";
import { useState } from "react";
import { AdminUser } from "@/features/admin/schema";
import { useFetchUsers } from "@/features/admin/hooks";
import { getAllUserSchema } from "@/features/admin/schema";
import { CreateStoreAdmin } from "@/features/admin/components/create-store-admin-dialog";
import { UserFilter } from "@/features/admin/components/user-filters";
import { UsersTable } from "@/features/admin/components/user-table";
import { UserPagination } from "@/features/admin/components/user-pagination";
import { EditStoreAdmin } from "@/features/admin/components/edit-store-admin-dialog";
import { DeleteStoreAdmin } from "@/features/admin/components/delete-store-admin-dialog";
import { StatCard } from "@/features/admin/components/star-card";
export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [sortBy, sortOrder] = sort.split(":");
  const query: getAllUserSchema = {
    page,
    limit: 10,
    search: search || undefined,
    role: (role || undefined) as getAllUserSchema["role"],
    sortBy: sortBy as getAllUserSchema["sortBy"],
    sortOrder: sortOrder as getAllUserSchema["sortOrder"],
  };
  const { data, isLoading } = useFetchUsers(query);
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Registered users</h1>
        <CreateStoreAdmin />
      </div>
      {data?.meta && (
        <div className="flex flex-wrap gap-3">
          <StatCard label="Total users" value={data.meta.totalData} />
        </div>
      )}
      <UserFilter
        search={search}
        role={role}
        sort={sort}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onRoleChange={(value) => {
          setRole(value === "all" ? "" : value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
      />
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <>
          <UsersTable
            users={data?.users ?? []}
            onEdit={setEditUser}
            onDelete={setDeleteUser}
          />
          {data?.meta && (
            <UserPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}
      <EditStoreAdmin user={editUser} onClose={() => setEditUser(null)} />
      <DeleteStoreAdmin user={deleteUser} onClose={() => setDeleteUser(null)} />
    </div>
  );
}
