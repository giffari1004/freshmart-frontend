"use client";

import { Store } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNearestStore } from "@/features/storefront/hooks";
import { useLocationStore } from "@/stores/location-store";

export function StoreInfoBar() {
  const { data, isLoading } = useNearestStore();
  const { requestLocation } = useLocationStore();

  if (isLoading) {
    return <Skeleton className="h-14 w-full rounded-lg" />;
  }

  if (!data) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-accent p-4">
      <div className="flex items-center gap-2 text-accent-foreground">
        <Store className="h-5 w-5 text-primary" />
        <span className="text-sm">
          Currently shopping from:{" "}
          <strong className="font-bold">{data.store.name}</strong>
          {!data.isInRange && (
            <span className="ml-2 text-xs font-semibold text-destructive">
              (out of delivery range)
            </span>
          )}
        </span>
      </div>
      <button
        onClick={requestLocation}
        className="text-sm font-bold text-primary hover:underline"
      >
        Change location
      </button>
    </div>
  );
}
