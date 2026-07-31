// src/features/auth/schema.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
