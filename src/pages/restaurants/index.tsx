// src/pages/restaurants.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRestaurantForm from "@/components/CreateRestaurantForm";
import EditRestaurantForm from "@/components/EditRestaurantForm"; // Import EditRestaurantForm
import { initialRestaurants, Restaurant } from "@/types"; // Import types and initial data

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] =
    useState<Restaurant[]>(initialRestaurants);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for edit dialog
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null,
  ); // State to hold the restaurant being edited

  const addRestaurant = (newRestaurant: Restaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  const editRestaurant = (updatedRestaurant: Restaurant) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === updatedRestaurant.id ? updatedRestaurant : r,
      ),
    );
    setIsEditDialogOpen(false); // Close the dialog after editing
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restaurants</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Restaurant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Restaurant</DialogTitle>
            </DialogHeader>
            <CreateRestaurantForm onAddRestaurant={addRestaurant} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardHeader>
              <CardTitle>
                <Link to={`/restaurants/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Areas:</h3>
              <ul>
                {restaurant.areas.map((area) => (
                  <li key={area.id}>{area.name}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button size="sm" onClick={() => navigate(restaurant.id)}>
                View Areas
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditClick(restaurant)}
              >
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Restaurant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
          </DialogHeader>
          {editingRestaurant && (
            <EditRestaurantForm
              restaurant={editingRestaurant}
              onEditRestaurant={editRestaurant}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantsPage;
