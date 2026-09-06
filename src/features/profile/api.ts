import { api } from "@/lib/axios";

export interface ProfileData {
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

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export const getProfile = async (): Promise<ProfileData> => {
  const response = await api.get<ApiResponse<ProfileData>>("/profile");
  return response.data.data;
};

export const updateProfile = async (payload: {
  name?: string;
  phone?: string;
}): Promise<ProfileData> => {
  const response = await api.patch<ApiResponse<ProfileData>>(
    "/profile",
    payload,
  );
  return response.data.data;
};

export const updateAvatar = async (file: File): Promise<ProfileData> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.patch<ApiResponse<ProfileData>>(
    "/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data.data;
};

export const updateEmail = async (payload: {
  email: string;
}): Promise<ProfileData> => {
  const response = await api.patch<ApiResponse<ProfileData>>(
    "/profile/email",
    payload,
  );
  return response.data.data;
};

export const updatePassword = async (payload: {
  currentPassword?: string;
  newPassword: string;
}): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(
    "/profile/password",
    payload,
  );
  return response.data;
};
