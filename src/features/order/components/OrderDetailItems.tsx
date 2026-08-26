import { OrderDetailItem } from "../order.type";

interface Props { items: OrderDetailItem[]; }

export function OrderDetailItems({ items }: Props) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-stone-900">Order Items</h2>
      <div className="mt-5 divide-y divide-stone-100">
        {items.map((item, index) => (
          <div key={`${item.productId}-${index}`} className="flex justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="font-medium text-stone-900">{item.productName}</p>
              <p className="mt-1 text-sm text-stone-500">
                {item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}
              </p>
            </div>
            <p className="font-semibold text-stone-900">
              Rp {item.subtotal.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
