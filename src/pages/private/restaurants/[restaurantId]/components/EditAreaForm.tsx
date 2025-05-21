// src/components/EditAreaForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Area } from "@/types";

interface EditAreaFormProps {
  area: Area;
  restaurantId: string;
  onEditArea: (restaurantId: string, updatedArea: Area) => void;
}

const EditAreaForm: React.FC<EditAreaFormProps> = ({
  area,
  restaurantId,
  onEditArea,
}) => {
  const [areaName, setAreaName] = useState(area.name);

  useEffect(() => {
    setAreaName(area.name);
  }, [area]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaName.trim()) {
      const updatedArea: Area = {
        ...area,
        name: areaName,
      };
      onEditArea(restaurantId, updatedArea);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-area-name" className="text-right">
          Area Name
        </Label>
        <Input
          id="edit-area-name"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          className="col-span-3"
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditAreaForm;
