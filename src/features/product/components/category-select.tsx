import { FieldValues, Path } from "react-hook-form";
import { useGetAllCategory } from "@/features/category/hooks";
import { Category } from "@/features/category/schema";
import { FormSelect } from "@/lib/form-select-helper";
import { Control, FieldError } from "react-hook-form";

interface CategorySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
}

export function CategorySelect<T extends FieldValues>({
  control,
  name,
  error,
}: CategorySelectProps<T>) {
  const { data: categoryData } = useGetAllCategory({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });

  return (
    <FormSelect
      control={control}
      name={name}
      placeholder="Select category"
      items={
        categoryData?.data.map((category: Category) => ({
          value: category.id,
          label: category.name,
        })) ?? []
      }
      error={error}
    />
  );
}
