import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload, UserData, LoginPayload, loginUser } from "./api";

export const useRegister = () => {
  return useMutation<UserData, Error, RegisterPayload>({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
};