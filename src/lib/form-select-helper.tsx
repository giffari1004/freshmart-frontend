import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormSelectItem = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  items: FormSelectItem[];
  error?: { message?: string };
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  placeholder,
  items,
  error,
}: FormSelectProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full h-12 rounded-2xl">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-destructive text-xs">{error.message}</p>}
    </div>
  );
}