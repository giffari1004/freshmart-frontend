import { AlertCircle, CheckCircle2 } from "lucide-react";

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
    <div className="mt-5 space-y-3">
      <ErrorAlert
        show={props.checkoutError}
        title="Unable to calculate checkout"
        text={
          props.checkoutErrorMessage ??
          "Please check your selected address and shipping method."
        }
      />
      <ErrorAlert
        show={props.orderError}
        title="Failed to create order"
        text={
          props.orderErrorMessage ??
          "Please review the checkout details and try again."
        }
      />
      <ErrorAlert
        show={props.paymentError}
        title="Failed to initialize payment"
        text={
          props.paymentErrorMessage ??
          "Your order was created, but payment initialization failed."
        }
      />
      <SuccessAlert
        orderNumber={props.orderNumber}
        status={props.orderStatus}
      />
    </div>
  );
}

function ErrorAlert({
  show,
  title,
  text,
}: {
  show?: boolean;
  title: string;
  text: string;
}) {
  if (!show) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
      <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
      <div>
        <p className="font-semibold text-red-800">{title}</p>
        <p className="mt-1 text-sm leading-6 text-red-700">{text}</p>
      </div>
    </div>
  );
}

function SuccessAlert({
  orderNumber,
  status,
}: {
  orderNumber?: string;
  status?: string;
}) {
  if (!orderNumber) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
      <div>
        <p className="font-semibold text-emerald-800">
          Order created successfully
        </p>
        <p className="mt-1 text-sm text-emerald-700">
          Order number: <span className="font-bold">{orderNumber}</span>
        </p>
        {status ? (
          <p className="mt-1 text-sm text-emerald-700">
            Status: <span className="font-semibold">{status}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
