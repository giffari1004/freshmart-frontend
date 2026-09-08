import { ProductComboBox } from "@/lib/product-combobox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormComboBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  storeId?: string;
  placeholder?: string;
}

export function FormComboBox<T extends FieldValues>({
  control,
  storeId,
  name,
}: FormComboBoxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ProductComboBox
        storeId={storeId}
          productId={field.value}
          onProductIdChange={field.onChange}
        />
      )}
    />
  );
}
