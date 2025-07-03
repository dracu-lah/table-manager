import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import BasicFormField from "@/components/FormElements/BasicFormField";
import TextAreaFormField from "@/components/FormElements/TextAreaFormField";
import SwitchFormField from "@/components/FormElements/SwitchFormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BASE_URL,
  GetOutletAPI,
  GetOutletsAPI,
  UpdateOutletAPI,
} from "@/services/api";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import { useParams } from "react-router";
import { useEffect } from "react";
import RestaurantSelectFormField from "@/components/tableManagerCommon/RestaurantSelectFormField";
import ImageCropFormField from "@/components/FormElements/ImageCropField";
import endPoint from "@/services/endPoint";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  cuisine: z.string().optional(),
  address: z.string().min(1),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  streetName: z.string().optional(),
  city: z.string().min(1),
  country: z.string().min(1),
  logoImageUrl: z.string().url().optional(),
  imageConfigurations: z.array(z.string()).optional(),
  hasCoverCharges: z.boolean(),
  standardCoverCharge: z.coerce.number(),
  operationalHours: z.record(z.any()).optional(),
  cancellationPolicy: z.string().optional(),
  hasMinimumSpend: z.boolean(),
  minimumSpendAmount: z.coerce.number(),
  requiresUpfrontPayment: z.boolean(),
  contactNumber: z.string().min(1),
  isActive: z.boolean(),
  tenant_id: z.coerce.number(),
});

export default function EditOutletForm() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    data: outlet,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetOutletAPI.name],
    queryFn: () => GetOutletAPI({ id }),
  });
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (outlet) {
      methods.reset({
        name: outlet.name || "",
        description: outlet.description || "",
        cuisine: outlet.cuisine || "",
        address: outlet.address || "",
        latitude: outlet.latitude ?? 0,
        longitude: outlet.longitude ?? 0,
        streetName: outlet.streetName || "",
        city: outlet.city || "",
        country: outlet.country || "",
        logoImageUrl: outlet.logoImageUrl || "",
        imageConfigurations: outlet.imageConfigurations ?? [],
        hasCoverCharges: outlet.hasCoverCharges ?? false,
        standardCoverCharge: outlet.standardCoverCharge ?? 0,
        operationalHours: outlet.operationalHours ?? {},
        cancellationPolicy: outlet.cancellationPolicy || "",
        hasMinimumSpend: outlet.hasMinimumSpend ?? false,
        minimumSpendAmount: outlet.minimumSpendAmount ?? 0,
        requiresUpfrontPayment: outlet.requiresUpfrontPayment ?? false,
        contactNumber: outlet.contactNumber || "",
        isActive: outlet.isActive ?? true,
        tenant_id: outlet.tenant_id,
      });
    }
  }, [outlet, methods.reset]);
  const updateMutation = useMutation({
    mutationFn: () => UpdateOutletAPI({ id }),
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({ queryKey: [GetOutletsAPI.name] });
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });
  const onSubmit = (data: any) => {
    updateMutation.mutate(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Outlet</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <ImageCropFormField
              url={BASE_URL + endPoint.logoImageUpload}
              name="logoImageUrl"
              label="Outlet Logo"
              required
              cropperWidth="100%"
              uploaderWidth="100%"
              uploaderHeight="200px"
              cropperHeight="300px"
              removeButtonText="Remove Logo"
              imageAlt="Outlet Logo"
            />
            <div className="grid grid-cols-2 gap-4">
              <RestaurantSelectFormField />
              <BasicFormField name="name" label="Name" required />
              <BasicFormField name="cuisine" label="Cuisine" />
              <BasicFormField name="address" label="Address" required />
              <BasicFormField
                name="latitude"
                label="Latitude"
                type="number"
                required
              />
              <BasicFormField
                name="longitude"
                label="Longitude"
                type="number"
                required
              />
              <BasicFormField name="streetName" label="Street Name" />
              <BasicFormField name="city" label="City" required />
              <BasicFormField name="country" label="Country" required />
              <BasicFormField
                name="standardCoverCharge"
                label="Standard Cover Charge"
                type="number"
              />
              <BasicFormField
                name="minimumSpendAmount"
                label="Minimum Spend Amount"
                type="number"
              />
              <BasicFormField
                name="contactNumber"
                label="Contact Number"
                required
              />
            </div>
            <div className="grid gap-4">
              <TextAreaFormField name="description" label="Description" />
              <TextAreaFormField
                name="cancellationPolicy"
                label="Cancellation Policy"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <SwitchFormField
                name="hasCoverCharges"
                label="Has Cover Charges"
              />
              <SwitchFormField
                name="hasMinimumSpend"
                label="Has Minimum Spend"
              />
              <SwitchFormField
                name="requiresUpfrontPayment"
                label="Requires Upfront Payment"
              />
              <SwitchFormField name="isActive" label="Is Active" />
            </div>

            <Button type="submit">
              {updateMutation.isPending ? "Updating" : "Update Outlet"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
