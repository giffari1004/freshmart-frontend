import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload, UserData, LoginPayload, loginUser, verifyEmail, VerifyEmailPayload, resendVerificationEmail, ResendVerificationPayload } from "./api";

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

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => verifyEmail(payload),
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (payload: ResendVerificationPayload) =>
      resendVerificationEmail(payload),
  });
};