import { ShoppingBag } from "lucide-react";
import { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutItemsProps {
  preview?: CheckoutPreviewResponse;
}

export function CheckoutItems({ preview }: CheckoutItemsProps) {
  return (
    <section className="rounded-[1.65rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] transition hover:border-emerald-200 sm:p-6">
      <SectionHeader />
      {preview?.items?.length ? (
        <div className="mt-6 space-y-3">
          {preview.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyItems />
      )}
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-700 shadow-sm">
        <ShoppingBag className="size-5" />
      </div>
      <div>
        <h2 className="font-bold text-stone-900">Your Items</h2>
        <p className="text-sm text-stone-500">
          Review the products in your order.
        </p>
      </div>
    </div>
  );
}

function ItemRow({
  item,
}: {
  item: CheckoutPreviewResponse["items"][number];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/70 bg-gradient-to-r from-stone-50 to-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-semibold text-stone-900">
          {item.productName}
        </p>
        <p className="mt-1 text-sm text-stone-500">
          {item.quantity} × Rp {item.unitPrice.toLocaleString("id-ID")}
        </p>
      </div>
      <p className="font-bold text-stone-900">
        Rp {item.subtotal.toLocaleString("id-ID")}
      </p>
    </div>
  );
}

function EmptyItems() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5">
      <p className="text-sm leading-6 text-stone-500">
        Cart data will appear after checkout preview.
      </p>
    </div>
  );
}
