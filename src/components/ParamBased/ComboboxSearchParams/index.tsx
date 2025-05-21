import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/PopoverDialog";
import { cn } from "@/lib/utils";

const ComboboxSearchParams = ({
  disabled,
  paramName,
  placeholder = "Select an option",
  label,
  required,
  items,
  showAllOption = false, // Enable or disable "All" option
  defaultValue = "", // Default value when no query param is set
  description,
  className = "w-[300px]",
  truncateText = true,
  customInputClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the default value if no query param exists
    const queryValue = searchParams.get(paramName);
    if (!queryValue && defaultValue !== undefined) {
      searchParams.set(paramName, defaultValue);
      setSearchParams(searchParams);
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
  }, [searchParams, paramName, defaultValue, navigate, setSearchParams]);

  const queryValue = searchParams.get(paramName);
  const selectedItem =
    items.find((item) => item.value === queryValue) ||
    (showAllOption && queryValue === "" ? { label: "All", value: "" } : null);

  const handleSelect = (item) => {
    searchParams.set(paramName, item.value);
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`, { replace: true });
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(className, "justify-between")}
          >
            <span
              className={cn(truncateText && "truncate", customInputClassName)}
            >
              {selectedItem?.label || placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${className} p-0`}>
          <div className="flex items-center border-b border-black/10">
            <div className="py-3 pl-2">
              <SearchIcon className="size-4 text-black/20" />
            </div>
            <input
              placeholder={`Search ${paramName}...`}
              className="w-full px-2 outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Command>
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup>
                {showAllOption && (
                  <CommandItem
                    key="all"
                    onSelect={() => handleSelect({ label: "All", value: "" })}
                  >
                    <span className={cn(truncateText && "truncate")}>All</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        queryValue === "" ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                )}
                {items
                  .filter((item) =>
                    item.label
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()),
                  )
                  .map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect(item)}
                    >
                      <span className={cn(truncateText && "truncate")}>
                        {item.label}
                      </span>
                      <Check
                        className={cn(
                          "ml-auto",
                          queryValue === item.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default ComboboxSearchParams;
