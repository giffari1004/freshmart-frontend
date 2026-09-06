import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, PathValue, UseFormReturn, useWatch } from "react-hook-form";
interface NumberStepperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  min:number
}
export function NumberStepper<T extends FieldValues>({
  form,
  name,
  min
}: NumberStepperProps<T>) {
  const weight = (useWatch({control:form.control,name}) ?? 0) as number;
  return (
    <div className="flex items-center rounded-2xl border border-input overflow-hidden h-12">
      <Button
        type="button"
        variant="ghost"
        className="h-full rounded-none px-4"
        onClick={() =>
          form.setValue(name, Math.max(min, weight - 1) as PathValue<T, Path<T>>,{shouldValidate:true})
        }
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        min={0}
        className="border-0 text-center shadow-none focus-visible:ring-0 h-full"
        value={weight}
        onChange={(e) => {
          const val = e.target.value;
          form.setValue(
            name,
            (val === "" ? undefined : Number(val)) as PathValue<T, Path<T>>,{shouldValidate:true}
          );
        }}
      />
      <Button
        type="button"
        variant="ghost"
        onClick={() =>
          form.setValue(name, (weight + 1) as PathValue<T, Path<T>>,{shouldValidate:true})
        }
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
