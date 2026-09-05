"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
interface QuantitySelectorProps { quantity: number; onIncrease: () => void; onDecrease: () => void; disabled?: boolean; }
export function QuantitySelector(props: QuantitySelectorProps) { return <div className="inline-flex items-center rounded-xl border border-stone-200 bg-white"><QuantityButton icon={<Minus className="size-4" />} label="Decrease quantity" disabled={props.disabled || props.quantity <= 1} onClick={props.onDecrease} /><span className="min-w-10 text-center text-sm font-semibold text-stone-900" aria-label={`Quantity ${props.quantity}`}>{props.quantity}</span><QuantityButton icon={<Plus className="size-4" />} label="Increase quantity" disabled={props.disabled} onClick={props.onIncrease} /></div>; }
function QuantityButton({ icon, label, disabled, onClick }: { icon: React.ReactNode; label: string; disabled?: boolean; onClick: () => void }) { return <Button type="button" variant="ghost" size="icon" disabled={disabled} onClick={onClick} aria-label={label} className="size-9 rounded-xl text-stone-600 hover:bg-stone-100">{icon}</Button>; }
