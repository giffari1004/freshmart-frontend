import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllUserSchema, updateStoreAdminSchema } from "./schema";
import {
  createAdmins,
  deleteAdmins,
  fetchUsers,
  updateAdmins,
} from "./admin-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useFetchUsers(query: getAllUserSchema) {
  return useQuery({
    queryKey: ["admins-users", query],
    queryFn: () => fetchUsers(query),
    placeholderData: keepPreviousData,
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
export function useUpdateAdmins() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateStoreAdminSchema }) =>
      updateAdmins(id, body),
    onSuccess: () => {
      toast.success("Updated admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admins-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err?.response?.data.message || "Updated admin unsuccessfully",
      );
    },
  });
}
export function useDeleteAdmins() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdmins(id),
    onSuccess: () => {
      toast.success("Deleted admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admins-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err?.response?.data.message || "Deleted admin unsuccessfully",
      );
    },
  });
}
