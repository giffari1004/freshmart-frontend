"use client";

import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";

import { useAddresses } from "@/features/address/hooks";
import { Address } from "@/features/address/api";
import { AddressCard } from "@/components/address/address-card";
import { AddressFormDialog } from "@/components/address/address-form-dialog";
import { EmptyAddressesState } from "@/components/address/empty-addresses-state";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddClick = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50">
      <main className="max-w-5xl w-full mx-auto py-8 px-4 flex-1">
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-44 bg-muted rounded-xl" />
              <div className="h-44 bg-muted rounded-xl" />
            </div>
          </div>
        ) : !addresses || addresses.length === 0 ? (
          <EmptyAddressesState onAddClick={handleAddClick} />
        ) : (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  My Addresses
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Manage your delivery locations for faster checkout.
                </p>
              </div>
              <Button
                onClick={handleAddClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 h-11 shrink-0 gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Address</span>
              </Button>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={() => handleEditClick(address)}
                />
              ))}

              {/* Dashed Placeholder Card */}
              <button
                type="button"
                onClick={handleAddClick}
                className="border-2 border-dashed border-border hover:border-primary/50 bg-background hover:bg-accent/30 transition-all rounded-xl p-6 min-h-45 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  Add a new delivery address
                </h3>
                <p className="text-xs text-muted-foreground">
                  Save multiple addresses for convenience
                </p>
              </button>
            </div>
          </div>
        )}

        <AddressFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode={editingAddress ? "edit" : "create"}
          initialData={editingAddress ?? undefined}
        />
      </main>

      {/* Shared Landing Page Footer */}
      <SiteFooter />
    </div>
  );
}
