import { Badge } from "@/components/ui/badge";
import { UserRole } from "../constans";

const LABEL: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  STORE_ADMIN: "Store Admin",
  CUSTOMER: "Customer",
};
const VARIANT: Record<UserRole, "default" | "secondary" | "outline"> = {
  SUPER_ADMIN: "outline",
  STORE_ADMIN: "default",
  CUSTOMER: "secondary",
};
export function RoleBadge({ role }: { role: UserRole }) {
  return <Badge variant={VARIANT[role]}>{LABEL[role]}</Badge>;
}
