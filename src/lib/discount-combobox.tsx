import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/features/product/constans";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "./utils";

interface DiscountProductComboBoxProps {
  products: Product[];
  productId: string | undefined;
  onProductIdChange: (value: string | undefined) => void;
}
export function DiscountProductComboBox({
  products,
  productId,
  onProductIdChange,
}: DiscountProductComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const selectedProduct = products.find((p) => p.id === productId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedProduct ? selectedProduct.name : "Select product"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search product}"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>
                No product found
            </CommandEmpty>
            <CommandGroup>
                {filteredProducts.map((p)=> (
                    <CommandItem key={p.id} value={p.name} onSelect={() => {onProductIdChange(p.id); setOpen(false); setSearch("")}}>
                        <Check className={cn("mr-2 h-4 w-4", productId === p.id ? "opacity-100" : "opacity-0")}/>
                        {p.name}
                    </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
