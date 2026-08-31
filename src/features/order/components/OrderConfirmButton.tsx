"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
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

export function OrderConfirmButton({
  canConfirm,
  isPending,
  onConfirm,
}: Props) {
  const [open, setOpen] = useState(false);

  if (!canConfirm) return null;

  const handleConfirm = () => {
    onConfirm(() => setOpen(false));
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        disabled={isPending}
        className="h-12 w-full rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-50"
      >
        <CheckCircle2 className="size-4" />
        Confirm Order Received
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <div className="mb-1 flex size-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="size-5" />
            </div>
            <DialogTitle>Confirm order received?</DialogTitle>
            <DialogDescription>
              Confirm only after you have received all items in this order.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Not Yet
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              {isPending ? "Confirming..." : "Confirm Received"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
