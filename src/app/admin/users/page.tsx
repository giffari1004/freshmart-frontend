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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth-store";
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
  const roleUser = useAuthStore((s) => s.user?.role);
  const canManage = roleUser === "SUPER_ADMIN";
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            User management
          </p>

          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Registered Users
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Manage store administrator accounts.
          </p>
        </div>
        {canManage && <CreateStoreAdmin />}
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
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <>
          <UsersTable
            canManage={canManage}
            users={data?.users ?? []}
            onEdit={setEditUser}
            onDelete={setDeleteUser}
          />
          {data?.meta && (
            <UserPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}
      {canManage && (
        <>
          <EditStoreAdmin user={editUser} onClose={() => setEditUser(null)} />

          <DeleteStoreAdmin
            user={deleteUser}
            onClose={() => setDeleteUser(null)}
          />
        </>
      )}
    </div>
  );
}
