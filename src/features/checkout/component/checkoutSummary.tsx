import { ArrowRight, Loader2, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartResponse } from "@/features/cart/cartType";
import type { CheckoutPreviewResponse } from "../checkout.type";

interface CheckoutSummaryProps {
  preview?: CheckoutPreviewResponse;
  cart?: CartResponse;
  onCreateOrder: () => void;
  isOrderLoading?: boolean;
  orderCreated?: boolean;
  canCreateOrder?: boolean;
}

type Values = { subtotal: number; discount: number; shipping: number; total: number };

export function CheckoutSummary(props: CheckoutSummaryProps) {
  const values = getSummaryValues(props.preview, props.cart);
  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardHeader className="px-4 sm:px-5"><SectionHeader /></CardHeader>
      <CardContent className="space-y-5 px-4 sm:px-5">
        <SummaryRows preview={props.preview} values={values} />
        <OrderButton {...props} />
      </CardContent>
    </Card>
  );
}

function getSummaryValues(preview?: CheckoutPreviewResponse, cart?: CartResponse): Values {
  const subtotal = preview?.subtotal ?? cart?.subtotal ?? 0;
  const discount = preview?.discount.amount ?? 0;
  const shipping = preview?.shipping.cost ?? 0;
  return { subtotal, discount, shipping, total: preview?.totalAmount ?? subtotal - discount };
}

function SectionHeader() {
  return <div className="flex items-center gap-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><ReceiptText className="size-4" /></div><div><CardTitle className="text-base font-semibold">Order Summary</CardTitle><p className="text-xs text-muted-foreground">Your current order total</p></div></div>;
}

function SummaryRows({ preview, values }: { preview?: CheckoutPreviewResponse; values: Values }) {
  return <div className="space-y-3 text-sm"><SummaryRow label="Items" value={String(preview?.totalItems ?? "—")} /><SummaryRow label="Subtotal" value={formatPrice(values.subtotal)} /><SummaryRow label="Discount" value={`- ${formatPrice(values.discount)}`} primary /><SummaryRow label="Shipping" value={preview ? formatPrice(values.shipping) : "—"} />{preview?.store ? <SummaryRow label="Distance" value={`${preview.store.distanceKm.toFixed(2)} km`} /> : null}<TotalRow value={formatPrice(values.total)} /></div>;
}

function SummaryRow({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) {
  return <div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">{label}</span><span className={primary ? "font-semibold text-primary" : "font-semibold text-foreground"}>{value}</span></div>;
}

function TotalRow({ value }: { value: string }) {
  return <div className="flex items-center justify-between gap-4 border-t border-border pt-4"><span className="font-semibold text-foreground">Total</span><span className="text-xl font-bold tracking-tight text-foreground">{value}</span></div>;
}

function OrderButton({ onCreateOrder, isOrderLoading, orderCreated, canCreateOrder }: CheckoutSummaryProps) {
  const disabled = isOrderLoading || orderCreated || !canCreateOrder;
  return <Button type="button" size="lg" className="h-10 w-full" onClick={onCreateOrder} disabled={disabled}>{isOrderLoading ? <><Loader2 className="animate-spin" />Processing...</> : orderCreated ? "Order Created" : <>Continue to Payment<ArrowRight /></>}</Button>;
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}
