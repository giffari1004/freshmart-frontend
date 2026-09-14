"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const increase = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-background">
      <QuantityButton
        icon={<Minus className="size-4" />}
        label="Decrease quantity"
        disabled={disabled || quantity <= 1}
        onClick={decrease}
      />

      <span
        className="min-w-10 text-center text-sm font-semibold text-foreground"
        aria-label={`Quantity ${quantity}`}
      >
        {quantity}
      </span>

      <QuantityButton
        icon={<Plus className="size-4" />}
        label="Increase quantity"
        disabled={disabled}
        onClick={increase}
      />
    </div>
  );
}

function QuantityButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className="size-9 rounded-lg text-muted-foreground hover:bg-muted"
    >
      {icon}
    </Button>
  );
}