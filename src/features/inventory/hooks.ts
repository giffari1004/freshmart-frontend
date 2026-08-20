import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllInventorySchema,
  getStockHistorySchema,
  stockInSchema,
  stockOutSchema,
  updateInventorySchema,
} from "./schema";
import {
  createInventory,
  deleteInventory,
  fetchInventory,
  getStockHistory,
  stockIn,
  stockOut,
  updateInventory,
} from "./inventory-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllInventories(query: getAllInventorySchema) {
  return useQuery({
    queryKey: ["inventories", query],
    queryFn: () => fetchInventory(query),
  });
}
export function useCreateInventory() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      toast.success("Created inventory successfully");
      mutate.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Created inventory unsuccessfully",
      );
    },
  });
}
export function useUpdateInventory() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateInventorySchema }) =>
      updateInventory(body, id),
    onSuccess: () => {
      toast.success("Update inventory successfully");
      mutate.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Update inventory unsuccessfully",
      );
    },
  });
}
export function useDeleteInventory() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInventory(id),
    onSuccess: () => {
      toast.success("Delete inventory successfully");
      mutate.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Unsuccessfully delete inventory",
      );
    },
  });
}
export function useStockIn() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: stockInSchema }) =>
      stockIn(id, body),
    onSuccess: () => {
      toast.success("Create stock in successfully");
      mutate.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Create stock in unsuccessfully",
      );
    },
  });
}
export function useStockOut() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: stockOutSchema }) =>
      stockOut(id, body),
    onSuccess: () => {
      toast.success("Create stock out successfully");
      mutate.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Create stock out unsuccessfully",
      );
    },
  });
}
export function useGetStockHistory(id: string, query: getStockHistorySchema) {
  return useQuery({
    queryKey: ["stock-history", id, query],
    queryFn: () => getStockHistory(id, query),
  });
}
