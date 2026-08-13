import { useEffect } from "react";
import { Inventory, STOCK_IN, stockInSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStockIn } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberStepper } from "@/lib/number-stepper";

interface StockInProps {
  inventory: Inventory | null;
  onClose: () => void;
}
export function StockIn({ inventory, onClose }: StockInProps) {
  const form = useForm<stockInSchema>({
    resolver: zodResolver(STOCK_IN),
    defaultValues: {
      quantity: 1,
      notes: "",
    },
  });
  useEffect(() => {
    if (inventory) {
      form.reset({
        quantity: 1,
        notes: "",
      });
    }
  }, [inventory, form]);
  const mutation = useStockIn();
  if (!inventory) return null;
  const currentInventory = inventory;
  function onsubmitButton(value: stockInSchema) {
    mutation.mutate(
      {
        id: currentInventory.id,
        body: value,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  }
  const numberQuantity = (form.watch("quantity") ?? 0) as number;
  return (
    <Dialog open={!!inventory} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Stock in
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            {`Create stock from ${inventory.store.name} for ${inventory.product.name}`}
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onsubmitButton)}>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </Label>
            <NumberStepper form={form} name="quantity" min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              className="h-12 rounded-2xl"
              {...form.register("notes")}
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium"
          >
            {mutation.isPending ? "Saving..." : "Create stock in"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
