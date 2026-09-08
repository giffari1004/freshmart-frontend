import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, PathValue, UseFormReturn, useWatch } from "react-hook-form";
import { number } from "zod";
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
  const value = (useWatch({control:form.control,name}) ?? "") as number | string;
  const weight =  typeof value === "number" ? value : 0
  return (
    <div className="flex items-center rounded-2xl border border-input overflow-hidden h-12">
      <Button
        type="button"
        variant="ghost"
        className="ml-5"
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
        value={value}
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
        className="mr-5"
        onClick={() =>
          form.setValue(name, (weight + 1) as PathValue<T, Path<T>>,{shouldValidate:true})
        }
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
