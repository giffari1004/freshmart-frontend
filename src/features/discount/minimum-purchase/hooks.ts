import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMinPurchaseOutput, createMinPurchaseOutput, updateMinPurchaseOutput } from "./schema";
import {
  createMinPurchaseDiscount,
  deleteMinPurchaseDiscount,
  fetchMinPurchaseDiscounts,
  updateMinPurchaseDiscount,
} from "./minimum-purchase-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllMinPurchaseDiscounts(query: getMinPurchaseOutput) {
  return useQuery({
    queryKey: ["min-purchase-discounts", query],
    queryFn: () => fetchMinPurchaseDiscounts(query),
  });
}
export function useCreateMinPurchaseDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: createMinPurchaseDiscount,
    onSuccess: () => {
      toast.success("Created discount successfully");
      mutate.invalidateQueries({ queryKey: ["min-purchase-discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Created discount unsuccessfully");
    },
  });
}
export function useUpdateMinPurchaseDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateMinPurchaseOutput }) =>
      updateMinPurchaseDiscount(body, id),
    onSuccess: () => {
      toast.success("Update discount successfully");
      mutate.invalidateQueries({ queryKey: ["min-purchase-discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Update discount unsuccessfully");
    },
  });
}
export function useDeleteMinPurchaseDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMinPurchaseDiscount(id),
    onSuccess: () => {
      toast.success("Delete discount successfully");
      mutate.invalidateQueries({ queryKey: ["min-purchase-discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Unsuccessfully delete discount");
    },
  });
}