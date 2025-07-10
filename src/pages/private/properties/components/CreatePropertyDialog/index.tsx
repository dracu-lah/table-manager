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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePropertyAPI, GetPropertiesAPI } from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";

const schema = z.object({
  tenantName: z.string().min(1, "Tenant name is required"),
  subscriptionPlan: z.string().min(1, "Subscription plan is required"),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().min(7, "Phone number is required"),
});

export default function CreateRestaurantDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tenantName: "",
      subscriptionPlan: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: CreatePropertyAPI,
    onSuccess: () => {
      toast.success("Restaurant created successfully");
      queryClient.invalidateQueries({ queryKey: [GetPropertiesAPI.name] });
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
        <Button>Create Restaurant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Restaurant</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <BasicFormField name="tenantName" label="Tenant Name" required />
            <BasicFormField
              name="subscriptionPlan"
              label="Subscription Plan"
              required
            />
            <BasicFormField
              name="contactEmail"
              label="Contact Email"
              required
            />
            <BasicFormField
              name="contactPhone"
              label="Contact Phone"
              required
            />

            <Button type="submit" className="w-full">
              {createMutation.isPending ? "Creating..." : "Create Restaurant"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
