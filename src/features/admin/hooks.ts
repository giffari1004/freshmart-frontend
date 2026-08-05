import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserSchema, updateStoreAdminSchema } from "./schema";
import { createAdmins, deleteAdmins, fetchUsers, updateAdmins } from "./api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useFetchUsers(query: getAllUserSchema) {
  return useQuery({
    queryKey: ["admins-users", query],
    queryFn: () => fetchUsers(query),
  });
}
export function useCreateAdmins() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmins,
    onSuccess: () => {
      toast.success("Created admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admins-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err?.response?.data.message || "Created admin unsuccessfully",
      );
    },
  });
}
export function useUpdateAdmins(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: updateStoreAdminSchema) => updateAdmins(id, body),
    onSuccess: () => {
      toast.success("Update admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admins-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data.message || "Update admin unsuccessfully");
    },
  });
}
export function useDeleteAdmins(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAdmins(id),
    onSuccess: () => {
      toast.success("Delete admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admins-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data.message || "Delete admin unsuccessfully");
    },
  });
}
