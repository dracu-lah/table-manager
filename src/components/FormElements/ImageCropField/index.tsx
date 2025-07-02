import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import ImageCrop from "@/components/uploaders/ImageCrop/ImageCrop";

interface ImageCropFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  cropperWidth?: string;
  uploaderWidth?: string;
  uploaderHeight?: string;
  cropperHeight?: string;
  url?: string;
  removeButtonText?: string;
  imageAlt?: string;
  imageClassName?: string;
}

export default function ImageCropFormField<T extends FieldValues>({
  name,
  label,
  required,
  className,
  disabled = false,
  cropperWidth = "100%",
  uploaderWidth = "100%",
  uploaderHeight = "200px",
  cropperHeight = "300px",
  url = "",
  removeButtonText = "Remove Image",
  imageAlt = "Uploaded Image",
  imageClassName = "h-20 w-20 rounded object-cover",
  ...rest
}: ImageCropFormFieldProps<T>) {
  const { control, setValue, watch } = useFormContext<T>();
  const currentValue = watch(name);

  return (
    <FormField
      key={name}
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={clsx("flex flex-col space-y-2", className)}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <ImageCrop
              url={url}
              cropperWidth={cropperWidth}
              uploaderWidth={uploaderWidth}
              uploaderHeight={uploaderHeight}
              cropperHeight={cropperHeight}
              onUploadResponse={(response) => {
                setValue(name, response);
              }}
              disabled={disabled}
              {...rest}
            />
          </FormControl>

          {currentValue && (
            <div className="flex items-center gap-2">
              <img
                src={currentValue}
                alt={imageAlt}
                className={imageClassName}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  setValue(name, "");
                }}
              >
                {removeButtonText}
              </Button>
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
