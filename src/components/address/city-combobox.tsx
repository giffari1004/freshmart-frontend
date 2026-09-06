"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { useSearchCities } from "@/features/address/hooks";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface CityComboboxProps {
  value: string;
  onSelect: (city: {
    cityName: string;
    rajaOngkirCityId: string;
    province: string;
  }) => void;
  error?: boolean;
}

export function CityCombobox({ value, onSelect, error }: CityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const { data: cities, isLoading } = useSearchCities(debouncedSearch);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between h-10 font-normal ${
            !value ? "text-muted-foreground" : ""
          } ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
        >
          <span className="truncate">{value || "Select city..."}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type city name (min 2 chars)..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {debouncedSearch.trim().length < 2 ? (
              <div className="p-4 text-xs text-center text-muted-foreground">
                Type at least 2 characters to search
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center p-4 text-xs text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span>Searching cities...</span>
              </div>
            ) : !cities || cities.length === 0 ? (
              <CommandEmpty>No city found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.cityId}
                    value={city.cityId}
                    onSelect={() => {
                      onSelect({
                        cityName: city.cityName,
                        rajaOngkirCityId: city.cityId,
                        province: city.province,
                      });
                      setOpen(false);
                    }}
                    className="flex items-center justify-between py-2 text-xs"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {city.cityName} ({city.type})
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {city.province}
                      </span>
                    </div>
                    {value === city.cityName && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
