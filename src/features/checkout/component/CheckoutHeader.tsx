import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CheckoutHeaderProps {
  title?: string;
  description?: string;
}

const steps = ["01 Delivery", "02 Shipping", "03 Payment"];

export function CheckoutHeader({
  title = "Complete your order",
  description = "Review your delivery details and order before continuing to payment.",
}: CheckoutHeaderProps) {
  return (
    <header className="space-y-4 border-b border-border pb-5">
      <Badge variant="outline" className="font-semibold text-primary">Checkout</Badge>
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            {index > 0 ? <Separator orientation="vertical" className="hidden h-4 sm:block" /> : null}
            <span className={index === 0 ? "text-primary" : undefined}>{step}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
