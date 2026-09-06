import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  assignStoreAdmin,
  searchStoreAdminUsers,
  GetStoresParams,
} from "./api";
import { StoreFormInput } from "./schema";
import axios from "axios";

export function useStores(params: GetStoresParams) {
  return useQuery({
    queryKey: ["stores", params],
    queryFn: () => getStores(params),
  });
}

export function useCreateStore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: StoreFormInput) => createStore(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success(data.message || "Store created successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Failed to create store")
      }
    },
  });
}

export function useUpdateStore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StoreFormInput }) =>
      updateStore(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success(data.message || "Store updated successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update store");
      }
    },
  });
}

export function useDeleteStore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStore(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success(data.message || "Store deleted successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete store");
      }
    },
  });
}

export function useAssignStoreAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, userId }: { storeId: string; userId: string }) =>
      assignStoreAdmin(storeId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success(data.message || "Admin assigned successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to assign admin");
      }
    },
  });
}

export function useSearchStoreAdminUsers(query: string) {
  const [debouncedQuery] = useDebounce(query, 300);

  return useQuery({
    queryKey: ["store-admin-users", debouncedQuery],
    queryFn: () => searchStoreAdminUsers(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
  });
}
