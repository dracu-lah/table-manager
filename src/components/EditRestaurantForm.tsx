// src/components/EditRestaurantForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialRestaurants, Restaurant, Area } from "@/types";

interface EditRestaurantFormProps {
  restaurant: Restaurant;
  onEditRestaurant: (updatedRestaurant: Restaurant) => void;
}

const EditRestaurantForm: React.FC<EditRestaurantFormProps> = ({
  restaurant,
  onEditRestaurant,
}) => {
  const [restaurantName, setRestaurantName] = useState(restaurant.name);

  // Update state if the restaurant prop changes (e.g., when a different restaurant is selected for editing)
  useEffect(() => {
    setRestaurantName(restaurant.name);
  }, [restaurant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurantName.trim()) {
      const updatedRestaurant: Restaurant = {
        ...restaurant,
        name: restaurantName,
      };
      onEditRestaurant(updatedRestaurant);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-name" className="text-right">
          Restaurant Name
        </Label>
        <Input
          id="edit-name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="col-span-3"
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditRestaurantForm;
