"use client";

import { useEffect, useState } from "react";
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
  const [value, setValue] = useState(quantity);

  useEffect(() => setValue(quantity), [quantity]);

  useEffect(() => {
    if (value === quantity) return;
    const timer = window.setTimeout(() => onChange(value), 400);
    return () => window.clearTimeout(timer);
  }, [value, quantity, onChange]);

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-background">
      <QuantityButton
        icon={<Minus className="size-4" />}
        label="Decrease quantity"
        disabled={disabled || value <= 1}
        onClick={() => setValue((current) => Math.max(1, current - 1))}
      />
      <span
        className="min-w-10 text-center text-sm font-semibold text-foreground"
        aria-label={`Quantity ${value}`}
      >
        {value}
      </span>
      <QuantityButton
        icon={<Plus className="size-4" />}
        label="Increase quantity"
        disabled={disabled}
        onClick={() => setValue((current) => current + 1)}
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
