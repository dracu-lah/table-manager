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
import SwitchFormField from "@/components/FormElements/SwitchFormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateZoneAPI, GetZonesAPI } from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";

// 🔐 Schema for validation
const schema = z.object({
  name: z.string().min(1),
  // canvasUrl: z.string().url(),
  canvasUrl: z.string().optional(),
  isActive: z.boolean(),
  location_id: z.coerce.number(),
});

type Zone = z.infer<typeof schema> & { id: number };

interface UpdateZoneDialogProps {
  zone: Zone;
}

export default function UpdateZoneDialog({ zone }: UpdateZoneDialogProps) {
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

  useEffect(() => {
    if (open && zone) {
      methods.reset({
        name: zone.name,
        canvasUrl: zone.canvasUrl,
        isActive: zone.isActive,
        location_id: zone.locationId,
      });
    }
  }, [open, zone, methods]);

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof schema>) =>
      UpdateZoneAPI({ id: zone.id, ...data }),
    onSuccess: () => {
      toast.success("Zone updated successfully");
      queryClient.invalidateQueries({ queryKey: [GetZonesAPI.name] });
      setOpen(false);
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    updateMutation.mutate(data);
  };

  console.log("methods.formState.errors", methods.formState.errors);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Zone</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <BasicFormField name="name" label="Zone Name" required />
            <SwitchFormField name="isActive" label="Is Active" />

            <Button type="submit" className="w-full">
              {updateMutation.isPending ? "Updating..." : "Update Zone"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
