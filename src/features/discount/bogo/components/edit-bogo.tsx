import { useForm, Controller } from "react-hook-form";
import { useUpdateBogo } from "@/features/discount/bogo/hooks";
import {
  Bogo,
  UPDATE_BOGO,
  updateBogoInput,
  updateBogoOutput,
} from "@/features/discount/bogo/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UpdateBogoProps {
  bogo: Bogo | null;
  onClose: () => void;
}

export function UpdateBogo({ bogo, onClose }: UpdateBogoProps) {
  const form = useForm<updateBogoInput, any, updateBogoOutput>({
    resolver: zodResolver(UPDATE_BOGO),
  });
  useEffect(() => {
    if (bogo) {
      form.reset({
        startDate: new Date(bogo.startDate),
        endDate: new Date(bogo.endDate),
      });
    }
  }, [bogo, form]);
  if (!bogo) return null;
  const currentBogo = bogo;
  const mutation = useUpdateBogo();
  function onSubmit(value: updateBogoOutput) {
    mutation.mutate(
      { id: currentBogo.id, body: value },
      { onSuccess: () => onClose() },
    );
  }
  return (
    <Dialog open={!!bogo} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl p-6 border-green-200">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Edit BOGO
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the promo period
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <Input
                  id="startDate"
                  type="date"
                  className="h-12 rounded-2xl"
                  defaultValue={
                    field.value
                      ? new Date(field.value as string | Date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Controller
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <Input
                  id="endDate"
                  type="date"
                  className="h-12 rounded-2xl"
                  defaultValue={
                    field.value
                      ? new Date(field.value as string | Date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-medium"
          >
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}