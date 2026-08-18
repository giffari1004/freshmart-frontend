import type { ReactNode } from "react";
import { OrderDetail } from "../order.type";

export function OrderDetailInformation({ order }: { order: OrderDetail }) {
  const cards = buildCards(order);
  return <section className="grid gap-6 md:grid-cols-2">{cards.map(renderCard)}</section>;
}

function buildCards(order: OrderDetail) {
  const { deliveryAddress, shipping, payment, store } = order;
  return [
    ["Store", <><p>{store.name || "Store unavailable"}</p><p>Code: {store.code || "-"}</p></>],
    ["Delivery Address", <><p>{deliveryAddress.recipientName} · {deliveryAddress.recipientPhone}</p><p>{formatAddress(deliveryAddress)}</p></>],
    ["Shipping Method", <><p>{shipping.serviceName || "Shipping unavailable"}</p><p>{shipping.etd || "Estimated time unavailable"}</p></>],
    ["Payment", <><p>{payment?.method ?? "Payment Gateway"}</p><p>{payment?.status ?? "Unavailable"}</p></>],
  ] as const;
}

function renderCard([title, children]: readonly [string, ReactNode]) {
  return <Info key={title} title={title}>{children}</Info>;
}

function formatAddress(address: OrderDetail["deliveryAddress"]) {
  return [address.fullAddress, address.district, address.city, address.province]
    .filter(Boolean).join(", ");
}

function Info({ title, children }: { title: string; children: ReactNode }) {
  return <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-semibold text-stone-500">{title}</h2><div className="mt-3 space-y-1 text-sm text-stone-900">{children}</div></div>;
}
