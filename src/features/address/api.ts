import { api } from "@/lib/axios";
import { AddressFormInput } from "./schema";

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  city: string;
  rajaOngkirCityId: string;
  province: string;
  district: string;
  fullAddress: string;
  postalCode?: string;
  isPrimary: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CitySearchResult {
  cityId: string;
  cityName: string;
  provinceId: string;
  province: string;
  type: string;
  postalCode: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get<ApiResponse<Address[]>>("/addresses");
  return response.data.data;
};

export const createAddress = async (
  payload: AddressFormInput,
): Promise<Address> => {
  const response = await api.post<ApiResponse<Address>>("/addresses", payload);
  return response.data.data;
};

export const updateAddress = async (
  id: string,
  payload: Omit<AddressFormInput, "isPrimary">,
): Promise<Address> => {
  const response = await api.patch<ApiResponse<Address>>(
    `/addresses/${id}`,
    payload,
  );
  return response.data.data;
};

export const deleteAddress = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/addresses/${id}`);
  return response.data;
};

export const setPrimaryAddress = async (id: string): Promise<Address> => {
  const response = await api.patch<ApiResponse<Address>>(
    `/addresses/${id}/set-primary`,
  );
  return response.data.data;
};

export const searchCities = async (
  query: string,
): Promise<CitySearchResult[]> => {
  const response = await api.get<ApiResponse<CitySearchResult[]>>(
    "/addresses/cities",
    {
      params: { search: query },
    },
  );
  return response.data.data;
};
