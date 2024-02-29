import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Badge } from "./badge";
import { OwnerType } from "@/types";

interface MultiSelectProps {
  options: OwnerType[];
  selected: string[]; // Assuming selected is an array of identifiers (e.g., string or number)
  onChange: (newSelected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    { options, selected, onChange, placeholder, className, ...props },
    forwardedRef
  ) => {
    const [open, setOpen] = useState(false);

    const handleUnselect = (item: string) => {
      onChange(selected.filter((i: string) => i !== item));
    };

    return (
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            ref={forwardedRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${
              selected.length > 1 ? "h-full p-2" : "h-9 p-4"
            }`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {selected.length > 0
                ? selected.map((item) => (
                    <Badge
                      variant="secondary"
                      key={item}
                      className="mr-1 mb-1"
                      onClick={() => handleUnselect(item)}
                    >
                      {options.find((option) => item === option.name)?.name}
                      <a
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => handleUnselect(item)}
                      >
                        <Cross2Icon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </a>
                    </Badge>
                  ))
                : placeholder}
            </div>
            <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
          <Command className={className}>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.name)
                        ? selected.filter((item) => item !== option.name)
                        : [...selected, option.name]
                    );
                    setOpen(true);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.name) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
