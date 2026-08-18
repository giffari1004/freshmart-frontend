"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
export function EmptyCart() { return <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white py-20"><ShoppingCart className="h-16 w-16 text-stone-300" /><h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2><p className="mt-2 text-sm text-stone-500">Looks like you haven't added any products yet.</p><Button asChild className="mt-8"><Link href="/products">Continue Shopping</Link></Button></div>; }
