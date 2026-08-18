"use client";

import {
  Carrot,
  Egg,
  Croissant,
  Fish,
  Coffee,
  Cookie,
  ShoppingBasket,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/storefront/hooks";
import { cn } from "@/lib/utils";

// Icon dipilih dari nama kategori secara heuristik (cocokkan keyword),
// fallback ke ikon keranjang generik kalau tidak ada yang cocok — karena
// backend cuma simpan nama kategori sebagai teks, tidak ada field icon.
const CATEGORY_ICONS: Record<string, typeof Carrot> = {
  fruit: Carrot,
  vegetable: Carrot,
  sayur: Carrot,
  buah: Carrot,
  dairy: Egg,
  egg: Egg,
  telur: Egg,
  bakery: Croissant,
  roti: Croissant,
  meat: Fish,
  seafood: Fish,
  daging: Fish,
  beverage: Coffee,
  minuman: Coffee,
  snack: Cookie,
  camilan: Cookie,
};

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();
  const match = Object.keys(CATEGORY_ICONS).find((keyword) =>
    lower.includes(keyword),
  );
  return match ? CATEGORY_ICONS[match] : ShoppingBasket;
}

interface CategoryFilterProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-semibold text-foreground">
        Shop by Category
      </h3>

      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 shrink-0 rounded-full" />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-none] [&::-webkit-scrollbar]:hidden">
          <CategoryChip
            label="All"
            icon={ShoppingBasket}
            active={selectedCategoryId === null}
            onClick={() => onSelectCategory(null)}
          />
          {categories?.map((category) => {
            const Icon = getCategoryIcon(category.name);
            return (
              <CategoryChip
                key={category.id}
                label={category.name}
                icon={Icon}
                active={selectedCategoryId === category.id}
                onClick={() => onSelectCategory(category.id)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

function CategoryChip({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Carrot;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors active:scale-95",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-background text-muted-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
