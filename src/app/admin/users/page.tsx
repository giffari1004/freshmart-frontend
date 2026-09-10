"use client";
import { useState } from "react";
import { AdminUser } from "@/features/admin/schema";
import { useFetchUsers } from "@/features/admin/hooks";
import { getAllUserSchema } from "@/features/admin/schema";
import { CreateStoreAdmin } from "@/features/admin/components/create-store-admin-dialog";
import { UserFilter } from "@/features/admin/components/user-filters";
import { UsersTable } from "@/features/admin/components/user-table";
import { EditStoreAdmin } from "@/features/admin/components/edit-store-admin-dialog";
import { DeleteStoreAdmin } from "@/features/admin/components/delete-store-admin-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth-store";
import { ShieldCheck, ShoppingBag, Store, Users } from "lucide-react";
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
  if (canManage) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              User Management
            </p>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl text-stone-900">
              Registered Users
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Manage customer, store admin, and super admin accounts.
            </p>
          </div>
          <CreateStoreAdmin />
        </div>
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
          <UsersTable
            users={data?.data ?? []}
            onEdit={setEditUser}
            onDelete={setDeleteUser}
            meta={data?.meta}
            onPageChange={setPage}
          />
        )}
        <EditStoreAdmin user={editUser} onClose={() => setEditUser(null)} />
        <DeleteStoreAdmin
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
        />
        {data?.data && (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-emerald-100 p-2.5">
                  <Users className="h-5 w-5 text-emerald-700" />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-900">
                {data.meta.totalData}
              </h2>
              <p className="mt-1 text-xs font-medium text-stone-500">
                Total Users
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-orange-100 p-2.5 w-fit">
                <ShoppingBag className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-900">
                {
                  data.data.filter((u: AdminUser) => u.role === "CUSTOMER")
                    .length
                }
              </h2>
              <p className="mt-1 text-xs font-medium text-stone-500">
                Customers
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-blue-100 p-2.5 w-fit">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-900">
                {
                  data.data.filter((u: AdminUser) => u.role === "STORE_ADMIN")
                    .length
                }
              </h2>
              <p className="mt-1 text-xs font-medium text-stone-500">
                Store Admins
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-purple-100 p-2.5 w-fit">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-900">
                {
                  data.data.filter((u: AdminUser) => u.role === "SUPER_ADMIN")
                    .length
                }
              </h2>
              <p className="mt-1 text-xs font-medium text-stone-500">
                Super Admins
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
