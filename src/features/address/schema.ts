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
  latitude: z
    .number({ error: "Please pin your exact location on the map" })
    .min(-90)
    .max(90),
  longitude: z
    .number({ error: "Please pin your exact location on the map" })
    .min(-180)
    .max(180),
  isPrimary: z.boolean(),
});

export type AddressFormInput = z.input<typeof addressFormSchema>;
export type AddressFormOutput = z.output<typeof addressFormSchema>;