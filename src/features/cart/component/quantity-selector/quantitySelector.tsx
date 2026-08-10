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
    <div className="flex items-center rounded-xl border border-stone-200">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled || quantity <= 1}
        onClick={onDecrease}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="min-w-10 text-center text-sm font-medium">
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}