import { api } from "@/lib/axios";
import { discountUsageSchemaType } from "./schema";

export async function fetchDiscountUsage( query : discountUsageSchemaType) {
  const { data } = await api.get("/discount/usage", { params: query });
  return data;
}
