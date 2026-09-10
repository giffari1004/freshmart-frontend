"use client";

import { useState } from "react";
import { useGetAllProduct } from "@/features/product/hooks";
import { Product } from "@/features/product/constans";
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
  productId,
  onProductIdChange,
}: ProductComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = useGetAllProduct({
    page: 1,
    limit: 50,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const products = data?.data ?? [];
  const selected = products.find((p: Product) => p.id === productId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selected ? selected.name : "All products"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search product..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>No product found</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="All products"
                onSelect={() => {
                  onProductIdChange(undefined);
                  setOpen(false);
                }}
              ><Check className={cn("mr-2 h-4 w-4", !productId ? "opacity-100" : "opacity-0")}/>All products</CommandItem>
              {products.map((item: Product) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onProductIdChange(item.id);
                    setOpen(false)
                  }}
                
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      productId === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
