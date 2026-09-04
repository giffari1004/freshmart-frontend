import { z } from "zod";

export const addressFormSchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  recipientName: z.string().trim().min(1, "Recipient name is required"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number is invalid")
    .max(20, "Phone number is invalid"),
  city: z.string().trim().min(1, "Please select a city"),
  rajaOngkirCityId: z
    .string()
    .trim()
    .min(1, "Please select a city from the list"),
  province: z.string().trim().min(1, "Province is required"),
  district: z.string().trim().min(1, "District is required"),
  fullAddress: z.string().trim().min(1, "Full address is required"),
  isPrimary: z.boolean(), // <-- ganti dari .optional().default(false)
});

export type AddressFormInput = z.infer<typeof addressFormSchema>;
