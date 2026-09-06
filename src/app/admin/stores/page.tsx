"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  UserPlus,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useStores, useDeleteStore } from "@/features/store/hooks";
import { Store } from "@/features/store/schema";
import { StoreFormDialog } from "@/components/admin/stores/store-form-dialog";
import { AssignAdminDialog } from "@/components/admin/stores/assign-admin-dialog";
import { StoreStatsCards } from "@/components/admin/stores/store-stats-card";

export default function StoreManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");
  const [page, setPage] = useState(1);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedStore, setSelectedStore] = useState<Store | undefined>();

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignStore, setAssignStore] = useState<Store | undefined>();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const deleteMutation = useDeleteStore();

  let sortBy: "name" | "code" | "createdAt" = "createdAt";
  let sortOrder: "asc" | "desc" = "desc";

  if (sortOption === "name-asc") {
    sortBy = "name";
    sortOrder = "asc";
  } else if (sortOption === "code-asc") {
    sortBy = "code";
    sortOrder = "asc";
  }

  const { data: storesResponse, isLoading } = useStores({
    page,
    limit: 5,
    search: debouncedSearch || undefined,
    status:
      statusFilter === "all"
        ? undefined
        : (statusFilter as "active" | "inactive"),
    sortBy,
    sortOrder,
  });

  const stores = storesResponse?.data ?? [];
  const meta = storesResponse?.meta;

  // Dihitung dari halaman yang lagi ditampilkan — bukan agregat seluruh
  // data (butuh endpoint stats terpisah kalau mau akurat lintas halaman),
  // tapi cukup buat kasih gambaran cepat tanpa request tambahan.
  const activeNow = stores.filter((s) => s.isActive).length;
  const avgRadiusKm =
    stores.length > 0
      ? Math.round(
          stores.reduce((sum, s) => sum + s.maxServiceRadiusKm, 0) /
            stores.length,
        )
      : undefined;
  const understaffed = stores.filter((s) => !s.storeAdmins?.length).length;

  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedStore(undefined);
    setFormDialogOpen(true);
  };

  const handleOpenEdit = (store: Store) => {
    setFormMode("edit");
    setSelectedStore(store);
    setFormDialogOpen(true);
  };

  const handleOpenAssign = (store: Store) => {
    setAssignStore(store);
    setAssignDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setDeleteConfirmId(null),
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      {/* Header Row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Physical outlet management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">
            Store Management
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage physical grocery outlets, delivery zones, and assigned
            administrators.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="h-11 gap-2 rounded-full bg-green-800 px-6 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
        >
          <Plus className="h-4 w-4" /> Add New Store
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
        <div className="relative min-w-55 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search store name or code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-30">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Sort by: Newest</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="code-asc">Code A-Z</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4 text-stone-400" />
        </Button>
      </div>

      {/* Table Card */}
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : stores.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white py-16 text-center">
          <Inbox className="size-5 text-stone-400" />
          <p className="text-sm font-medium text-stone-700">No stores found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50/60 hover:bg-stone-50/60">
                <TableHead>Store Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>City/Address</TableHead>
                <TableHead>Max Radius</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Store Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => {
                const admin = store.storeAdmins?.[0];
                return (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium text-stone-900">
                      {store.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-stone-500">
                      {store.code}
                    </TableCell>
                    <TableCell className="max-w-55 truncate text-stone-500">
                      {store.address}, {store.city}
                    </TableCell>
                    <TableCell className="text-stone-700">
                      {store.maxServiceRadiusKm}km
                    </TableCell>
                    <TableCell>
                      {store.isActive ? (
                        <Badge className="bg-emerald-700 font-semibold hover:bg-emerald-700">
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-stone-100 font-semibold text-stone-600 hover:bg-stone-100"
                        >
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {admin ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={admin.avatarUrl}
                              alt={admin.name}
                            />
                            <AvatarFallback>
                              {admin.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-stone-900">
                            {admin.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm italic text-stone-400">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleOpenEdit(store)}
                            className="gap-2"
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenAssign(store)}
                            className="gap-2"
                          >
                            <UserPlus className="h-4 w-4" /> Assign Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirmId(store.id)}
                            className="gap-2 text-rose-600 focus:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {meta && (
            <div className="flex items-center justify-between border-t border-stone-200 px-4 py-3 text-xs text-stone-500">
              <div>
                Showing{" "}
                <span className="font-medium text-stone-900">
                  {(meta.page - 1) * meta.limit + 1}-
                  {Math.min(meta.page * meta.limit, meta.totalData)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-stone-900">
                  {meta.totalData}
                </span>{" "}
                stores
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      className={
                        page === pageNum
                          ? "h-8 w-8 bg-emerald-700 text-xs font-bold hover:bg-emerald-700"
                          : "h-8 w-8 text-xs font-bold"
                      }
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ),
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, meta.totalPages))
                  }
                  disabled={page === meta.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analytics Cards */}
      <StoreStatsCards
        totalStores={meta?.totalData}
        activeNow={activeNow}
        avgRadiusKm={avgRadiusKm}
        understaffed={understaffed}
      />

      {/* Dialogs */}
      <StoreFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        mode={formMode}
        initialData={selectedStore}
      />

      {assignStore && (
        <AssignAdminDialog
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          storeId={assignStore.id}
          storeName={assignStore.name}
          currentAdminName={assignStore.storeAdmins?.[0]?.name}
        />
      )}

      <AlertDialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this store?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this store and may affect related
              inventory, orders, and staff assignments. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={deleteMutation.isPending}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
