import { Package } from "lucide-react";
import { OrderDetailItem } from "../order.type";

interface Props {
  items: OrderDetailItem[];
}

export function OrderDetailItems({ items }: Props) {
  return (
    <section className="rounded-[1.65rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
          <Package className="size-5" />
        </div>
        <div>
          <h2 className="font-black text-stone-950">Order Items</h2>
          <p className="text-sm text-stone-500">Products included in this order.</p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-stone-100">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="flex flex-col gap-3 rounded-2xl px-3 py-4 first:pt-0 even:bg-stone-50/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-stone-900">
                {item.productName}
              </p>
              <p className="mt-1 text-sm text-stone-500">
                {item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}
              </p>
            </div>
            <p className="font-black text-stone-950">
              Rp {item.subtotal.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
