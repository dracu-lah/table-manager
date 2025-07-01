import ComboboxFormField from "@/components/FormElements/ComboboxFormField";
import { GetRestaurantsAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const RestaurantSelect = () => {
  const {
    data: restaurantsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetRestaurantsAPI.name],
    queryFn: () => GetRestaurantsAPI(),
  });
  const data =
    restaurantsData?.map((restaurant: any) => ({
      label: restaurant.tenantName,
      value: restaurant.id,
    })) || [];
  return (
    <ComboboxFormField
      name="tenant_id"
      className="w-full"
      items={data}
      placeholder="Select Restaurant"
      label="Restaurant"
    />
  );
};

export default RestaurantSelect;
