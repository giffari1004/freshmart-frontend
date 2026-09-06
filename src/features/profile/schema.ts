import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number is invalid")
    .max(20)
    .optional()
    .or(z.literal("")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8, "Must be at least 8 characters"),
    confirmNewPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine(
    (data) =>
      !data.currentPassword || data.newPassword !== data.currentPassword,
    {
      message: "New password must be different from current password",
      path: ["newPassword"],
    },
  );

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
