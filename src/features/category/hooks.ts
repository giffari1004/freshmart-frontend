import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./api";
import {
  createCategorySchema,
  getAllCategorySchema,
  updateCategorySchema,
} from "./schema";
import { toast } from "sonner";
import { AxiosError } from "axios";
export function useGetAllCategory(query: getAllCategorySchema) {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => fetchCategories(query),
  });
}
export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Created category successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Created category unsuccessfully",
      );
    },
  });
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateCategorySchema }) =>
      updateCategory(id, body),
    onSuccess: () => {
      toast.success("Updated category successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Updated category unsuccessfully",
      );
    },
  });
}
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Deleted category successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Deleted category unsuccessfully",
      );
    },
  });
}
