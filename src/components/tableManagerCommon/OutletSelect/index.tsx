import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
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
import PageLoader from "@/components/loaders/PageLoader";
import { cn } from "@/lib/utils";
import { GetOutletsAPI } from "@/services/api";

const OutletSelect = ({
  outlet,
  setOutlet,
  propertyId,
  enableAll = false,
  disabled = false,
  buttonClassName = "w-[280px] justify-between",
  popoverClassName = "w-[280px] p-0",
  inputClassName = "w-full px-2 outline-none",
  placeholder = "Select an Outlet",
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [GetOutletsAPI.name, propertyId],
    queryFn: () => GetOutletsAPI(),
    enabled: propertyId !== 0,
  });

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const allOutlets = (data ?? []) as any[];
  const filteredOutlets = allOutlets.filter(
    (o) => o.propertyId === propertyId,
  );

  useEffect(() => {
    if (filteredOutlets.length > 0) {
      setOutlet(filteredOutlets[0].id);
    }
  }, [filteredOutlets]);

  const handleSelect = (selectedOutlet) => {
    setOutlet(selectedOutlet.id);
    setOpen(false);
  };

  const handleSelectAll = () => {
    setOutlet(0);
    setOpen(false);
  };

  if (isLoading) return <PageLoader size="4" />;
  if (error) return <p className="text-red-500">Failed to load outlets</p>;

  const searchFilteredOutlets = filteredOutlets.filter((o) =>
    o.name?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const getDisplayText = () => {
    if (outlet === 0 && enableAll) return "All Outlets";
    const selectedOutlet = allOutlets.find((o) => o.id === outlet);
    return selectedOutlet?.name || placeholder;
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[300px] justify-between", buttonClassName)}
          disabled={disabled || propertyId === 0}
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(popoverClassName)}>
        <div className="flex items-center border-b border-black/10">
          <div className="py-3 pl-2">
            <SearchIcon className="size-4" />
          </div>
          <input
            placeholder="Search Outlet..."
            className={cn(inputClassName)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Command>
          <CommandList>
            <CommandEmpty>No outlets found.</CommandEmpty>
            <CommandGroup>
              {enableAll && (
                <CommandItem onSelect={handleSelectAll}>
                  <span className="truncate">All Outlets</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      outlet === 0 ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              )}
              {searchFilteredOutlets.map((o) => (
                <CommandItem key={o.id} onSelect={() => handleSelect(o)}>
                  <span className="truncate">{o.name}</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      outlet === o.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OutletSelect;
