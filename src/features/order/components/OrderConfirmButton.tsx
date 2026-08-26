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

interface Props {
  canConfirm: boolean;
  isPending: boolean;
  onConfirm: (onDone: () => void) => void;
}

export function OrderConfirmButton({ canConfirm, isPending, onConfirm }: Props) {
  const [open, setOpen] = useState(false);

  if (!canConfirm) return null;

  const handleConfirm = () => {
    onConfirm(() => setOpen(false));
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} disabled={isPending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50">
        Confirm Order Received
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm order received?</DialogTitle>
            <DialogDescription>
              Confirm only after you have received all items in this order.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>Not Yet</Button>
            <Button type="button" onClick={handleConfirm} disabled={isPending} className="bg-emerald-700 hover:bg-emerald-800">
              {isPending ? "Confirming..." : "Confirm Received"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
