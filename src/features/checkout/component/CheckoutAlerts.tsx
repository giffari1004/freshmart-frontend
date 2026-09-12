import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface CheckoutAlertsProps {
  checkoutError?: boolean;
  orderError?: boolean;
  paymentError?: boolean;
  checkoutErrorMessage?: string;
  orderErrorMessage?: string;
  paymentErrorMessage?: string;
  orderNumber?: string;
  orderStatus?: string;
}

export function CheckoutAlerts(props: CheckoutAlertsProps) {
  return (
    <div className="space-y-3">
      <ErrorAlert show={props.checkoutError} title="Unable to calculate checkout" text={props.checkoutErrorMessage ?? "Please check your selected address and shipping method."} />
      <ErrorAlert show={props.orderError} title="Failed to create order" text={props.orderErrorMessage ?? "Please review the checkout details and try again."} />
      <ErrorAlert show={props.paymentError} title="Failed to initialize payment" text={props.paymentErrorMessage ?? "Your order was created, but payment initialization failed."} />
      <SuccessAlert orderNumber={props.orderNumber} status={props.orderStatus} />
    </div>
  );
}

function ErrorAlert({ show, title, text }: { show?: boolean; title: string; text: string }) {
  if (!show) return null;
  return <Card className="border-destructive/30 bg-destructive/5 p-4"><AlertContent icon={<AlertCircle className="size-4 text-destructive" />} title={title} text={text} /></Card>;
}

function SuccessAlert({ orderNumber, status }: { orderNumber?: string; status?: string }) {
  if (!orderNumber) return null;
  return <Card className="border-success/30 bg-success/5 p-4"><AlertContent icon={<CheckCircle2 className="size-4 text-primary" />} title="Order created successfully" text={`Order number: ${orderNumber}${status ? ` · Status: ${status}` : ""}`} /></Card>;
}

function AlertContent({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="flex items-start gap-3"><div className="pt-0.5">{icon}</div><div><p className="text-sm font-semibold text-foreground">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div></div>;
}
