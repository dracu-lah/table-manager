import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import BasicFormField from "@/components/FormElements/BasicFormField";
import TextAreaFormField from "@/components/FormElements/TextAreaFormField";
import SwitchFormField from "@/components/FormElements/SwitchFormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, CreateOutletAPI, GetOutletsAPI } from "@/services/api";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import RestaurantSelectFormField from "@/components/tableManagerCommon/RestaurantSelectFormField";
import ImageCrop from "@/components/uploaders/ImageCrop/ImageCrop";
import { Label } from "@/components/ui/label";
import ImageCropFormField from "@/components/FormElements/ImageCropField";
import { useNavigate } from "react-router";
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
const defaultValues = {
  name: "",
  description: "",
  cuisine: "",
  address: "",
  latitude: 0,
  longitude: 0,
  streetName: "",
  city: "",
  country: "",
  logoImageUrl: "",
  imageConfigurations: [],
  hasCoverCharges: false,
  standardCoverCharge: 0,
  operationalHours: {},
  cancellationPolicy: "",
  hasMinimumSpend: false,
  minimumSpendAmount: 0,
  requiresUpfrontPayment: false,
  contactNumber: "",
  isActive: true,
  tenant_id: 0,
};

export default function OutletCreateForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const createMutation = useMutation({
    mutationFn: CreateOutletAPI,
    onSuccess: () => {
      toast.success("Created Successfully");
      queryClient.invalidateQueries({ queryKey: [GetOutletsAPI.name] });
      methods.reset(defaultValues);
      navigate(-1);
    },
    onError: ({ response }: any) => {
      showErrorAlert(response.data);
    },
  });
  const onSubmit = (data: z.infer<typeof schema>) => {
    createMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Outlet</CardTitle>
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
            <div className="grid grid-cols-1 gap-4">
              {/* Input Fields */}
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
              {/* Textareas */}
              <div className="grid grid-cols-2 gap-4">
                <TextAreaFormField name="description" label="Description" />
                <TextAreaFormField
                  name="cancellationPolicy"
                  label="Cancellation Policy"
                />
              </div>

              {/* Switches */}
              <div className="flex gap-4">
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
            </div>
            <Button type="submit">
              {createMutation.isPending ? "Creating" : "Create Outlet"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
