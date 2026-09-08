"use client";

import { useState } from "react";
import { useGetAllInventories } from "@/features/inventory/hooks";
import { Inventory } from "@/features/inventory/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductComboBoxProps {
  storeId?: string;
  productId: string | undefined;
  onProductIdChange: (value: string | undefined) => void;
}
export function ProductComboBox({
  storeId,
  productId,
  onProductIdChange,
}: ProductComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = useGetAllInventories({
    page: 1,
    limit: 20,
    storeId,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const products = data?.data ?? [];
  const uniqueProducts = products.reduce(
    (acc: Inventory[], item: Inventory) => {
      const exists = acc.some((p) => p.product.id === item.product.id);
      if (!exists) {
        acc.push(item);
      }
      return acc;
    },
    [],
  );
  const selected = uniqueProducts.find((item:Inventory) => item.product.id === productId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between sm:w-52"
        >
          {selected ? selected.product.name : "All products"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search product"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>No product available</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onProductIdChange(undefined);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 size-4",
                    !productId ? "opacity-100" : "opacity-0",
                  )}
                />
                All products
              </CommandItem>
              {uniqueProducts.map((item:Inventory) => (
                <CommandItem
                  key={item.product.id}
                  onSelect={() => {
                    onProductIdChange(item.product.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      productId === item.product.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
