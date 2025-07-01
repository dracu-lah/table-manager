import CreateRestaurantDialog from "./components/CreateRestaurantDialog";
import RestaurantsList from "./components/RestaurantsList";

const RestaurantPage = () => {
  return (
    <div className="p-6">
      <div className=" mx-auto">
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Restaurants Management</h1>
          </div>

          <CreateRestaurantDialog />
        </div>
        <RestaurantsList />
      </div>
    </div>
  );
};

export default RestaurantPage;
