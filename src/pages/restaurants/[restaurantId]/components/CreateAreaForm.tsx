import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Area {
  id: string;
  name: string;
}

interface CreateAreaFormProps {
  restaurantId: string;
  onAddArea: (restaurantId: string, newArea: Area) => void;
}

const CreateAreaForm: React.FC<CreateAreaFormProps> = ({
  restaurantId,
  onAddArea,
}) => {
  const [areaName, setAreaName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaName.trim()) {
      const newArea: Area = {
        id: Date.now().toString(), // Simple unique ID
        name: areaName,
      };
      onAddArea(restaurantId, newArea);
      setAreaName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="areaName" className="text-right">
          Area Name
        </Label>
        <Input
          id="areaName"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          className="col-span-3"
        />
      </div>
      <Button type="submit">Add Area</Button>
    </form>
  );
};

export default CreateAreaForm;
