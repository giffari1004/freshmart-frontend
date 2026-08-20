import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDiscountsOutput, updateDiscountOutput } from "./schema";
import { createDiscount, deleteDiscount, fetchDiscounts, updateDiscount } from "./direct-discount-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllDiscounts(query: getDiscountsOutput) {
  return useQuery({
    queryKey: ["discounts", query],
    queryFn: () => fetchDiscounts(query),
  });
}
export function useCreateDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      toast.success("Created discount successfully");
      mutate.invalidateQueries({ queryKey: ["discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Created discount unsuccessfully");
    },
  });
}
export function useUpdateDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateDiscountOutput }) =>
      updateDiscount(body, id),
    onSuccess: () => {
      toast.success("Update discount successfully");
      mutate.invalidateQueries({ queryKey: ["discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Update discount unsuccessfully");
    },
  });
}
export function useDeleteDiscount() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      toast.success("Delete discount successfully");
      mutate.invalidateQueries({ queryKey: ["discounts"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Unsuccessfully delete discount");
    },
  });
}