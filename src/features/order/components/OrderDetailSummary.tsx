import { OrderDetail } from "../order.type";

export function OrderDetailSummary({ order }: { order: OrderDetail }) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-stone-900">Order Summary</h2>
      <div className="mt-5 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value={order.subtotal} />
        <SummaryRow label="Discount" value={-order.discountAmount} />
        <SummaryRow label="Shipping" value={order.shippingCost} />
        <div className="border-t pt-3">
          <SummaryRow label="Total" value={order.totalAmount} strong />
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span>Rp {value.toLocaleString("id-ID")}</span>
    </div>
  );
}
