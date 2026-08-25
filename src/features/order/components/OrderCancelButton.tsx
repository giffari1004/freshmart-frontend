"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCancelOrder } from "../hooks";

export function OrderCancelButton({ orderId }: { orderId: string }) {
  const mutation = useCancelOrder();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    mutation.mutate(orderId, {
      onSuccess: () => setOpen(false),
    });
  };

  if (mutation.isSuccess) {
    return <p className="text-sm text-emerald-700">Order cancelled.</p>;
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        disabled={mutation.isPending}
        className="h-11 rounded-xl border-red-200 px-5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        Cancel Order
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this order?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Your reserved stock will be
              released according to the order cancellation rules.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
            >
              Keep Order
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Cancelling..." : "Confirm Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
