import { z } from "zod";

export const storeFormSchema = z.object({
  name: z.string().trim().min(1, "Store name is required"),
  code: z
    .string()
    .trim()
    .min(1, "Store code is required")
    .max(50)
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and dashes allowed"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "Please select a city"),
  rajaOngkirCityId: z.string().trim().min(1, "Please select a city from the list"),
  latitude: z
    .number({ error: "Click the map to set a location" })
    .min(-90)
    .max(90),
  longitude: z
    .number({ error: "Click the map to set a location" })
    .min(-180)
    .max(180),
  maxServiceRadiusKm: z.coerce.number().positive("Must be greater than 0"),
  isActive: z.boolean().optional(),
});

export type StoreFormInput = z.input<typeof storeFormSchema>;
export type StoreFormOutput = z.output<typeof storeFormSchema>

export interface StoreAdmin {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Store {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  rajaOngkirCityId: string;
  latitude: number;
  longitude: number;
  maxServiceRadiusKm: number;
  isActive: boolean;
  storeAdmins?: StoreAdmin[];
  createdAt: string;
  updatedAt: string;
}