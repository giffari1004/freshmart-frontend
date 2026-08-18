"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface CartSummaryProps { totalItems: number; subtotal: number; onClear?: () => void; isClearing?: boolean; }
export function CartSummary({ totalItems, subtotal, onClear, isClearing = false }: CartSummaryProps) { return <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold text-stone-900">Order Summary</h2><SummaryRows totalItems={totalItems} subtotal={subtotal} /><SummaryActions totalItems={totalItems} onClear={onClear} isClearing={isClearing} /></div>; }
function SummaryRows({ totalItems, subtotal }: Pick<CartSummaryProps, "totalItems" | "subtotal">) { return <div className="mt-6 space-y-4"><Row label="Total Items" value={String(totalItems)} /><Row label="Subtotal" value={formatPrice(subtotal)} /></div>; }
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between text-sm"><span className="text-stone-500">{label}</span><span className="font-semibold text-stone-900">{value}</span></div>; }
function SummaryActions({ totalItems, onClear, isClearing }: Pick<CartSummaryProps, "totalItems" | "onClear" | "isClearing">) { return <><Button asChild className="mt-8 h-11 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800"><Link href="/cart/checkout">Proceed to Checkout</Link></Button><Button type="button" variant="outline" disabled={isClearing || totalItems === 0} className="mt-3 h-11 w-full rounded-xl" onClick={onClear}>{isClearing ? "Clearing..." : "Clear Cart"}</Button></>; }
function formatPrice(price: number) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price); }
