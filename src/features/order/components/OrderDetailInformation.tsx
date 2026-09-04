import type { ReactNode } from "react";
import { MapPin, PackageCheck, Store, WalletCards } from "lucide-react";
import { OrderDetail } from "../order.type";

export function OrderDetailInformation({
  order,
}: {
  order: OrderDetail;
}) {
  const cards = buildCards(order);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {cards.map(renderCard)}
    </section>
  );
}

function buildCards(order: OrderDetail) {
  const { deliveryAddress, shipping, payment, store } = order;

  return [
    [
      "Store",
      <div className="flex gap-3">
        <Store className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">{store.name || "Store unavailable"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Code: {store.code || "-"}</p>
        </div>
      </div>,
    ],
    [
      "Delivery Address",
      <div className="flex gap-3">
        <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">
            {deliveryAddress.recipientName} · {deliveryAddress.recipientPhone}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {formatAddress(deliveryAddress)}
          </p>
        </div>
      </div>,
    ],
    [
      "Shipping Method",
      <div className="flex gap-3">
        <PackageCheck className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">
            {shipping.serviceName || "Shipping unavailable"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {shipping.etd || "Estimated time unavailable"}
          </p>
        </div>
      </div>,
    ],
    [
      "Payment",
      <div className="flex gap-3">
        <WalletCards className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">
            {payment?.method ?? "Payment Gateway"}
          </p>
          <p className="mt-1 text-sm capitalize text-muted-foreground">
            {formatPaymentStatus(payment?.status)}
          </p>
          {payment ? (
            <p className="mt-1 font-bold text-foreground">
              Rp {payment.amount.toLocaleString("id-ID")}
            </p>
          ) : null}
        </div>
      </div>,
    ],
  ] as const;
}

function renderCard([
  title,
  children,
]: readonly [string, ReactNode]) {
  return (
    <Info key={title} title={title}>
      {children}
    </Info>
  );
}

function formatAddress(address: OrderDetail["deliveryAddress"]) {
  return [
    address.fullAddress,
    address.district,
    address.city,
    address.province,
  ]
    .filter(Boolean)
    .join(", ");
}

function formatPaymentStatus(status?: string) {
  if (!status) return "Payment status unavailable";
  return status.replaceAll("_", " ");
}

function Info({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.65rem] border border-border bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:border-border sm:p-6">
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-primary">
        {title}
      </h2>
      <div className="mt-4 text-sm text-foreground">{children}</div>
    </div>
  );
}
