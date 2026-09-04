"use client";

import React from "react";
import { Home, Building2, MapPin, Pencil, Trash2 } from "lucide-react";

import { Address } from "@/features/address/api";
import {
  useDeleteAddress,
  useSetPrimaryAddress,
} from "@/features/address/hooks";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
}

export function AddressCard({ address, onEdit }: AddressCardProps) {
  const { mutate: deleteAddr, isPending: isDeleting } = useDeleteAddress();
  const { mutate: setPrimary, isPending: isSettingPrimary } =
    useSetPrimaryAddress();

  const getLabelIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("home") || l.includes("rumah"))
      return <Home className="h-4 w-4 text-primary" />;
    if (l.includes("office") || l.includes("kantor"))
      return <Building2 className="h-4 w-4 text-primary" />;
    return <MapPin className="h-4 w-4 text-primary" />;
  };

  return (
    <div className="border border-border bg-background rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {getLabelIcon(address.label)}
            <span className="font-bold text-foreground text-base">
              {address.label}
            </span>
          </div>
          {address.isPrimary && (
            <Badge className="bg-emerald-800 text-emerald-100 font-bold text-[10px] px-2.5 py-0.5 rounded-md hover:bg-emerald-800">
              Primary
            </Badge>
          )}
        </div>

        {/* Address Body */}
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <p className="font-bold text-foreground text-sm">
            {address.recipientName}
          </p>
          <p>{address.phone}</p>
          <p className="leading-relaxed">{address.fullAddress}</p>
          <p>
            {address.district}, {address.city}
            {address.postalCode ? ` ${address.postalCode}` : ""}
          </p>
        </div>
      </div>

      <div>
        <hr className="border-border my-3" />

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div>
            {!address.isPrimary && (
              <button
                type="button"
                disabled={isSettingPrimary}
                onClick={() => setPrimary(address.id)}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {isSettingPrimary ? "Setting..." : "Set as Primary"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  disabled={isDeleting}
                  className="flex items-center gap-1 text-destructive hover:underline disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this address?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove &quot;{address.label}&quot;
                    from your saved addresses. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteAddr(address.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
