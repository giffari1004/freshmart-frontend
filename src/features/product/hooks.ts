import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProductSchema, updateProductOutputSchema } from "./schema";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./product-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllProduct(query: getAllProductSchema) {
  return useQuery({
    queryKey: ["admin-products", query],
    queryFn: () => fetchProducts(query),
  });
}
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: () => {
      toast.success("Created product successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Created product unsuccessfully",
      );
    },
  });
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateProductOutputSchema }) =>
      updateProduct(id, body),
    onSuccess: () => {
      toast.success("Updated product successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Updated product unsuccessfully",
      );
    },
  });
}
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data.message || "Deleted product unsuccessfully",
      );
    },
  });
}
