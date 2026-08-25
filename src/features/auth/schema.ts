import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().trim().email({ message: "Enter a valid email address" }),
});

export const loginFormSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;
export type LoginFormInput = z.infer<typeof loginFormSchema>;