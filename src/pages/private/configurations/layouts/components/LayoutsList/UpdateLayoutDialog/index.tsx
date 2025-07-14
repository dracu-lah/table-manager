import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BasicFormField from "@/components/FormElements/BasicFormField";
// Removed SwitchFormField as isActive is no longer in payload
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateLayoutAPI, // Renamed API
  GetLayoutsAPI, // Renamed API
  UploadLayoutImageAPI, // Renamed API
} from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import ImageCropFormField from "@/components/FormElements/ImageCropField";
// import endPoint from "@/services/endPoint"; // Likely not needed here anymore

// 🔐 Schema for validation - updated to reflect the payload of { name, imageUrl }
const schema = z.object({
  name: z.string().min(1, "Layout name is required"),
  imageUrl: z
    .string()
    .url("Image URL must be valid")
    .min(1, "Layout thumbnail is required"),
});

// Define the type for a single layout item from your API response
interface Layout {
  // Renamed from Zone
  id: string; // Assuming id is a string UUID
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  // Removed isActive and rvcOutletId as per the new payload/response
}

interface UpdateLayoutDialogProps {
  // Renamed from UpdateZoneDialogProps
  layout: Layout; // Renamed from zone
}

export default function UpdateLayoutDialog({
  layout,
}: UpdateLayoutDialogProps) {
  // Renamed component and prop
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (open && layout) {
      // Use layout instead of zone
      methods.reset({
        name: layout.name,
        imageUrl: layout.imageUrl, // Set initial imageUrl
        // Removed isActive and rvcOutletId as they are no longer in schema/payload
      });
    }
  }, [open, layout, methods]);

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof schema>) =>
      UpdateLayoutAPI({ id: layout.id, ...data }), // Pass layout.id and data
    onSuccess: () => {
      toast.success("Layout updated successfully"); // Update toast message
      queryClient.invalidateQueries({ queryKey: [GetLayoutsAPI.name] }); // Invalidate the new query key
      setOpen(false);
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      name: data.name,
      imageUrl: data.imageUrl,
    };
    updateMutation.mutate(payload); // Ensure only name and imageUrl are passed
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Layout</DialogTitle> {/* Update dialog title */}
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <ImageCropFormField
              apiFn={UploadLayoutImageAPI} // Use the renamed API
              name="imageUrl" // This name should match the field in your schema
              label="Layout Thumbnail" // Update label
              required
              removeButtonText="Remove Thumbnail"
              imageAlt="Layout Thumbnail" // Update alt text
            />
            <BasicFormField name="name" label="Layout Name" required />{" "}
            {/* Update label */}
            {/* Removed SwitchFormField as isActive is not part of the payload */}
            <Button
              type="submit"
              className="w-full"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Updating..." : "Update Layout"}{" "}
              {/* Update button text */}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
