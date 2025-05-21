import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Area {
  id: string;
  name: string;
}

interface Restaurant {
  id: string;
  name: string;
  areas: Area[];
}

interface CreateRestaurantFormProps {
  onAddRestaurant: (newRestaurant: Restaurant) => void;
}

const CreateRestaurantForm: React.FC<CreateRestaurantFormProps> = ({
  onAddRestaurant,
}) => {
  const [restaurantName, setRestaurantName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurantName.trim()) {
      const newRestaurant: Restaurant = {
        id: Date.now().toString(), // Simple unique ID
        name: restaurantName,
        areas: [],
      };
      onAddRestaurant(newRestaurant);
      setRestaurantName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Restaurant Name
        </Label>
        <Input
          id="name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="col-span-3"
        />
      </div>
      <Button type="submit">Create Restaurant</Button>
    </form>
  );
};

export default CreateRestaurantForm;
