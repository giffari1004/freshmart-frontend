"use client";

import { useState } from "react";
import { AlertTriangle, XCircle } from "lucide-react";
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
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-accent p-4 text-sm font-semibold text-primary">
        <XCircle className="size-4" />
        Order cancelled successfully.
      </div>
    );
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        disabled={mutation.isPending}
        className="h-11 rounded-xl border-red-200 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
      >
        Cancel Order
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <div className="mb-1 flex size-10 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle>Cancel this order?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Any reserved stock will be released
              according to the order cancellation rules.
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
