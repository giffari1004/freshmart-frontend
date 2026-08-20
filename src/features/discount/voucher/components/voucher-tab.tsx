"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateVoucher } from "./create-voucher";
import { DeleteVoucher } from "./delete-voucher";
import { UpdateVoucher } from "./edit-voucher.";
import { VoucherFilter } from "./voucher-filter";
import { VoucherPagination } from "./voucher-pagination";
import { VoucherTable } from "./vourcher-table";
import { useGetAllVouchers } from "../hooks";
import { getAllVoucherSchema, Voucher } from "../schema";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function VoucherTab() {
  const role = useAuthStore((s) => s.user?.role);
  const canManageVoucher = role === "SUPER_ADMIN";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [usageType, setUsageType] = useState<string | undefined>(undefined);
  const [valueType, setValueType] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [sort, setSort] = useState("createdAt:desc");
  const [sortBy, sortOrder] = sort.split(":");
  const [editVoucher, setEditVoucher] = useState<Voucher | null>(null);
  const [deleteVoucher, setDeleteVoucher] = useState<Voucher | null>(null);

  const query: getAllVoucherSchema = {
    page,
    limit: 10,
    search: search || undefined,
    usageType: usageType as getAllVoucherSchema["usageType"],
    valueType: valueType as getAllVoucherSchema["valueType"],
    isActive,
    sortBy: sortBy as getAllVoucherSchema["sortBy"],
    sortOrder: sortOrder as getAllVoucherSchema["sortOrder"],
  };
  const { data, isLoading } = useGetAllVouchers(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Discount management
          </p>
          <h1 className="mt-1 font-serif text-3xl text-stone-900">Vouchers</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage store-wide vouchers
          </p>
        </div>
        {canManageVoucher && <CreateVoucher />}
      </div>

      <VoucherFilter
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        usageType={usageType}
        onUsageTypeChange={(v) => {
          setUsageType(v);
          setPage(1);
        }}
        valueType={valueType}
        onValueTypeChange={(v) => {
          setValueType(v);
          setPage(1);
        }}
        isActive={isActive}
        onIsActiveChange={(v) => {
          setIsActive(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <>
          <VoucherTable
            vouchers={data?.data ?? []}
            onEdit={setEditVoucher}
            onDelete={setDeleteVoucher}
          />
          {data?.meta && (
            <VoucherPagination meta={data.meta} onPageChange={setPage} />
          )}
        </>
      )}

      {canManageVoucher && (
        <>
          <UpdateVoucher voucher={editVoucher} onClose={() => setEditVoucher(null)} />
          <DeleteVoucher voucher={deleteVoucher} onClose={() => setDeleteVoucher(null)} />
        </>
      )}
    </div>
  );
}