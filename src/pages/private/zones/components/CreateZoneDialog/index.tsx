import { useState } from "react";
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
import { CreateZoneAPI, GetZonesAPI } from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";

const schema = z.object({
  name: z.string().min(1, "Zone name is required"),
  canvasUrl: z.string().url("Canvas URL must be valid"),
  isActive: z.boolean(),
  tenant_id: z.coerce.number(),
  location_id: z.coerce.number(),
});

export default function CreateZoneDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      canvasUrl: "",
      isActive: true,
      tenant_id: 0,
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
            <BasicFormField
              name="tenant_id"
              label="Tenant ID"
              type="number"
              required
            />
            <BasicFormField
              name="location_id"
              label="Location ID"
              type="number"
              required
            />
            <BasicFormField name="name" label="Zone Name" required />
            <BasicFormField name="canvasUrl" label="Canvas URL" required />
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
