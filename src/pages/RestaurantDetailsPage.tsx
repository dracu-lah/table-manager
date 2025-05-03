// src/pages/RestaurantDetailsPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAreaForm from "@/components/CreateAreaForm";
import AreaCard from "@/components/AreaCard"; // Import AreaCard
import EditAreaForm from "@/components/EditAreaForm"; // Import EditAreaForm
import { initialRestaurants, Restaurant, Area } from "@/types";

const RestaurantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] =
    useState<Restaurant[]>(initialRestaurants); // In a real app, fetch from an API
  const restaurant = restaurants.find((r) => r.id === id);

  const [isEditAreaDialogOpen, setIsEditAreaDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);

  if (!restaurant) {
    return <div className="container mx-auto py-8">Restaurant not found.</div>;
  }

  const addAreaToRestaurant = (restaurantId: string, newArea: Area) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === restaurantId ? { ...r, areas: [...r.areas, newArea] } : r,
      ),
    );
  };

  const editAreaInRestaurant = (restaurantId: string, updatedArea: Area) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              areas: r.areas.map((a) =>
                a.id === updatedArea.id ? updatedArea : a,
              ),
            }
          : r,
      ),
    );
    setIsEditAreaDialogOpen(false); // Close the dialog
  };

  const handleDeleteArea = (restaurantId: string, areaId: string) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === restaurantId
          ? { ...r, areas: r.areas.filter((a) => a.id !== areaId) }
          : r,
      ),
    );
  };

  const handleEditAreaClick = (area: Area) => {
    setEditingArea(area);
    setIsEditAreaDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <Button onClick={() => navigate("/restaurants")} className="mb-6">
        Back to Restaurants
      </Button>
      <h1 className="text-3xl font-bold mb-6">{restaurant.name}</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Areas</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Area</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Area to {restaurant.name}</DialogTitle>
            </DialogHeader>
            <CreateAreaForm
              restaurantId={restaurant.id}
              onAddArea={addAreaToRestaurant}
            />
          </DialogContent>
        </Dialog>
      </div>

      {restaurant.areas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.areas.map((area) => (
            <AreaCard
              key={area.id}
              area={area}
              restaurantId={restaurant.id}
              onEditClick={() => handleEditAreaClick(area)}
              onDeleteClick={handleDeleteArea}
            />
          ))}
        </div>
      ) : (
        <p>No areas added yet.</p>
      )}

      {/* Edit Area Dialog */}
      <Dialog
        open={isEditAreaDialogOpen}
        onOpenChange={setIsEditAreaDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Area</DialogTitle>
          </DialogHeader>
          {editingArea && (
            <EditAreaForm
              area={editingArea}
              restaurantId={restaurant.id}
              onEditArea={editAreaInRestaurant}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetailsPage;
