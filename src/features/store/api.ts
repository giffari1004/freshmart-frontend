import { api } from "@/lib/axios";
import { Store, StoreAdmin, StoreFormInput } from "./schema";

export interface GetStoresParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
  sortBy?: "name" | "code" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

export const getStores = async (params?: GetStoresParams) => {
  const response = await api.get<ApiResponse<Store[]>>("/stores", { params });
  return response.data;
};

export const createStore = async (payload: StoreFormInput) => {
  const { isActive, ...createPayload } = payload;
  const response = await api.post<ApiResponse<Store>>("/stores", createPayload);
  return response.data;
};

export const updateStore = async (id: string, payload: StoreFormInput) => {
  const response = await api.patch<ApiResponse<Store>>(
    `/stores/${id}`,
    payload,
  );
  return response.data;
};

export const deleteStore = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/stores/${id}`);
  return response.data;
};

export const assignStoreAdmin = async (storeId: string, userId: string) => {
  const response = await api.patch<ApiResponse<Store>>(
    `/stores/${storeId}/assign-admin`,
    { userId },
  );
  return response.data;
};

export const searchStoreAdminUsers = async (query: string) => {
  const response = await api.get<ApiResponse<StoreAdmin[]>>(
    "/admin/users",
    {
      params: { search: query, role: "STORE_ADMIN", limit: 20 },
    },
  );
  return response.data;
};
