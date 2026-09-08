import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface PriceInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

export function PriceInput<T extends FieldValues>({
  form,
  name,
  prefix = "Rp ",
  suffix,
  placeholder,
}: PriceInputProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          customInput={Input}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder ?? `${prefix}0`}
          className="h-12 rounded-2xl"
          value={field.value ?? ""}
          onValueChange={(values) => {
            field.onChange(values.value === "" ? "" : values.floatValue)
          }}
        />
      )}
    />
  );
}