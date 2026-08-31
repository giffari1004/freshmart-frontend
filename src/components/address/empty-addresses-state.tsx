"use client";

import React from "react";
import {
  MapPin,
  Home,
  ShoppingBag,
  Plus,
  Zap,
  Truck,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EmptyAddressesStateProps {
  onAddClick: () => void;
}

export function EmptyAddressesState({ onAddClick }: EmptyAddressesStateProps) {
  return (
    <div className="max-w-2xl mx-auto my-8 border border-border bg-background rounded-2xl p-8 sm:p-12 shadow-sm text-center">
      {/* Layered Decorative Illustration */}
      <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100/70 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-emerald-700" />
        </div>
        <div className="absolute top-1 right-1 w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm rotate-12">
          <Home className="h-4 w-4" />
        </div>
        <div className="absolute bottom-2 left-1 w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shadow-sm -rotate-12 border border-sky-200">
          <ShoppingBag className="h-4 w-4" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        No addresses yet
      </h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
        Add your first address to start shopping. Your saved addresses will
        appear here for a faster checkout experience.
      </p>

      <Button
        onClick={onAddClick}
        size="lg"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 h-auto gap-2 shadow-sm"
      >
        <Plus className="h-5 w-5" />
        <span>+ Add Address</span>
      </Button>

      {/* Divider */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            WHY SAVE ADDRESSES?
          </span>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
        <div className="border border-border rounded-xl p-5 bg-background shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <Zap className="h-4 w-4 fill-amber-700" />
          </div>
          <h3 className="font-bold text-foreground text-sm mb-1">
            Fast Checkout
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Save time at checkout by having your location ready.
          </p>
        </div>

        <div className="border border-border rounded-xl p-5 bg-background shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Truck className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-foreground text-sm mb-1">
            Delivery Tracking
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get accurate delivery estimates for your area.
          </p>
        </div>
      </div>

      {/* Popular Near You Non-Interactive Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
        <div className="flex items-center gap-1.5 font-medium">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Popular near you:</span>
        </div>
        <Badge
          variant="secondary"
          className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-normal px-3 py-1"
        >
          Downtown
        </Badge>
        <Badge
          variant="secondary"
          className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-normal px-3 py-1"
        >
          Financial District
        </Badge>
        <Badge
          variant="secondary"
          className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-normal px-3 py-1"
        >
          Westside
        </Badge>
      </div>
    </div>
  );
}
