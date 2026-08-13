"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-stone-200 bg-white">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={
          disabled || quantity <= 1
        }
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="size-9 rounded-xl text-stone-600 hover:bg-stone-100"
      >
        <Minus className="size-4" />
      </Button>

      <span
        className="min-w-10 text-center text-sm font-semibold text-stone-900"
        aria-label={`Quantity ${quantity}`}
      >
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="size-9 rounded-xl text-stone-600 hover:bg-stone-100"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}