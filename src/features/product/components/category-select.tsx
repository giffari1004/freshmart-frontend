import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategory } from "@/features/category/hooks";
import { Category } from "@/features/category/schema";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface CategorySelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}
export function CategorySelect<T extends FieldValues>({
  form,
  name,
}: CategorySelectProps<T>) {
  const { data: categoryData } = useGetAllCategory({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });
  return (
    <Select
      value={form.watch(name) || undefined}
      onValueChange={(value) =>
        form.setValue(name, value as PathValue<T, Path<T>>)
      }
    >
      <SelectTrigger className="h-12 rounded-2xl w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categoryData?.data.map((category: Category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
