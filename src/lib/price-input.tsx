import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { createProductInputSchema } from "../features/product/schema";
interface PriceInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}
export function PriceInput<T extends FieldValues>({
  form,
  name,
}: PriceInputProps<T>) {
  const basePrice = form.watch(name);
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      prefix="Rp "
      allowNegative={false}
      customInput={Input}
      placeholder="Rp 0"
      className="h-12 rounded-2xl"
      value={(basePrice ?? "") as number | string}
      onValueChange={(values) => {
        form.setValue(
          name,
          (values.floatValue ? values.floatValue : undefined) as PathValue<
            T,
            Path<T>
          >,
        );
      }}
    />
  );
}
