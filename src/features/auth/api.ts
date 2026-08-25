import { api } from "@/lib/axios";

export interface RegisterPayload {
  name: string;
  email: string;
  referralCode?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: string;
  authProvider: string;
  isVerified: boolean;
  referralCode?: string | null;
  storeId?: string | null;
  createdAt: string;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isVerified: boolean;
      storeId?: string | null;
      // ... other fields matching UserData if needed
    };
    accessToken: string;
  };
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<UserData> => {
  const response = await api.post<RegisterApiResponse>(
    "/auth/register",
    payload,
  );
  return response.data.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post<LoginApiResponse>("/auth/login", payload);
  return response.data.data;
};