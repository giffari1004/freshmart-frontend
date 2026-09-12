import type { ReactNode } from "react";
import { MapPin, PackageCheck, Store, WalletCards } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OrderDetail } from "../order.type";

export function OrderDetailInformation({ order }: { order: OrderDetail }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <InfoCard title="Store" icon={<Store className="size-4" />}>
        <p className="font-semibold">{order.store.name || "Store unavailable"}</p>
        <p className="mt-1 text-xs text-muted-foreground">Code: {order.store.code || "-"}</p>
      </InfoCard>
      <InfoCard title="Delivery Address" icon={<MapPin className="size-4" />}>
        <p className="font-semibold">{order.deliveryAddress.recipientName} · {order.deliveryAddress.recipientPhone}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{formatAddress(order.deliveryAddress)}</p>
      </InfoCard>
      <InfoCard title="Shipping Method" icon={<PackageCheck className="size-4" />}>
        <p className="font-semibold">{order.shipping.serviceName || "Shipping unavailable"}</p>
        <p className="mt-1 text-sm text-muted-foreground">{order.shipping.etd || "Estimated time unavailable"}</p>
      </InfoCard>
      <InfoCard title="Payment" icon={<WalletCards className="size-4" />}>
        <p className="font-semibold">{order.payment?.method ?? "Payment Gateway"}</p>
        <p className="mt-1 text-sm capitalize text-muted-foreground">{formatPaymentStatus(order.payment?.status)}</p>
        {order.payment ? <p className="mt-1 font-semibold">Rp {order.payment.amount.toLocaleString("id-ID")}</p> : null}
      </InfoCard>
    </section>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-primary">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent">{icon}</span>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em]">{title}</h2>
        </div>
        <div className="mt-3 text-sm text-foreground">{children}</div>
      </CardContent>
    </Card>
  );
}

function formatAddress(address: OrderDetail["deliveryAddress"]) {
  return [address.fullAddress, address.district, address.city, address.province].filter(Boolean).join(", ");
}

function formatPaymentStatus(status?: string) {
  return status ? status.replaceAll("_", " ") : "Payment status unavailable";
}
