import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllVoucherSchema, updateVoucherOutput } from "./schema";
import {
  createVoucher,
  deleteVoucher,
  fetchVoucher,
  getVoucherById,
  updateVoucher,
} from "./voucher-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllVouchers(query: getAllVoucherSchema) {
  return useQuery({
    queryKey: ["vouchers", query],
    queryFn: () => fetchVoucher(query),
  });
}
export function useGetVoucherById(id: string) {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: () => getVoucherById(id),
    enabled: !!id,
  });
}
export function useCreateVoucher() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: createVoucher,
    onSuccess: () => {
      toast.success("Created voucher successfully");
      mutate.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Created voucher unsuccessfully");
    },
  });
}
export function useUpdateVoucher() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateVoucherOutput }) =>
      updateVoucher(body, id),
    onSuccess: () => {
      toast.success("Update voucher successfully");
      mutate.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Update voucher unsuccessfully");
    },
  });
}
export function useDeleteVoucher() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVoucher(id),
    onSuccess: () => {
      toast.success("Delete voucher successfully");
      mutate.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Unsuccessfully delete voucher");
    },
  });
}