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
import SwitchFormField from "@/components/FormElements/SwitchFormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, CreateZoneAPI, GetZonesAPI } from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import endPoint from "@/services/endPoint";
import ImageCropFormField from "@/components/FormElements/ImageCropField";

const schema = z.object({
  name: z.string().min(1, "Zone name is required"),
  // canvasUrl: z.string().url("Canvas URL must be valid"),
  canvasUrl: z.string().optional(),
  isActive: z.boolean(),
  location_id: z.coerce.number(),
});

export default function CreateZoneDialog({ outletId }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      canvasUrl: "",
      isActive: true,
      location_id: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: CreateZoneAPI,
    onSuccess: () => {
      toast.success("Zone created successfully");
      queryClient.invalidateQueries({ queryKey: [GetZonesAPI.name] });
      setOpen(false);
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });

  useEffect(() => {
    methods.setValue("location_id", outletId);
  }, [outletId]);
  const onSubmit = (data: z.infer<typeof schema>) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Zone</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Zone</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <ImageCropFormField
              url={BASE_URL + endPoint.canvasThumbnailImage}
              name="canvasUrl"
              label="Zone Image"
              required
              cropperWidth="100%"
              uploaderWidth="100%"
              uploaderHeight="200px"
              cropperHeight="300px"
              removeButtonText="Remove Zone"
              imageAlt="Zone Image"
            />
            <BasicFormField name="name" label="Zone Name" required />
            <SwitchFormField name="isActive" label="Is Active" />

            <Button type="submit" className="w-full">
              {createMutation.isPending ? "Creating..." : "Create Zone"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
