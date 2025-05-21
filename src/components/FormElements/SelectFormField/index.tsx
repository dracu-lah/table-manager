import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const SelectFormField = ({
  disabled,
  name,
  placeholder,
  label,
  required,
  items,
  description,
  className = "w-[180px]",
}) => {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Select
              disabled={disabled}
              onValueChange={(value) => setValue(name, value)}
              value={field.value}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No items to be selected</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectFormField;
