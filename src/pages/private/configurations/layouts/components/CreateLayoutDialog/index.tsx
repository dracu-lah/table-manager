import { useEffect, useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateLayoutAPI,
  GetLayoutsAPI,
  UploadLayoutImageAPI,
} from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import ImageCropFormField from "@/components/FormElements/ImageCropField";

const schema = z.object({
  name: z.string().min(1, "Layout name is required"),
  imageUrl: z
    .string()
    .url("Image URL must be valid")
    .min(1, "Layout thumbnail is required"),
});

// Removed outletId from props as it's not used internally for creation payload
export default function CreateLayoutDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: CreateLayoutAPI,
    onSuccess: () => {
      toast.success("Layout created successfully");
      queryClient.invalidateQueries({ queryKey: [GetLayoutsAPI.name] });
      setOpen(false);
      methods.reset();
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });

  // useEffect for outletId is now completely removed as it's not needed.

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      name: data.name,
      imageUrl: data.imageUrl,
    };
    createMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Layout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Layout</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <ImageCropFormField
              apiFn={UploadLayoutImageAPI}
              name="imageUrl"
              label="Layout Thumbnail"
              required
              removeButtonText="Remove Thumbnail"
              imageAlt="Layout Thumbnail"
            />
            <BasicFormField name="name" label="Layout Name" required />

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Layout"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
