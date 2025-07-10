import ComboboxFormField from "@/components/FormElements/ComboboxFormField";
import { GetPropertiesAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const PropertySelectFormField = () => {
  const {
    data: propertysData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetPropertiesAPI.name],
    queryFn: () => GetPropertiesAPI(),
  });
  const data =
    propertysData?.map((property: any) => ({
      label: property.propertyName,
      value: property.id,
    })) || [];
  return (
    <ComboboxFormField
      name="propertyId"
      className="w-full"
      items={data}
      placeholder="Select Property"
      label="Property"
    />
  );
};

export default PropertySelectFormField;
