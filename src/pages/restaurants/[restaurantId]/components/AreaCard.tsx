// src/components/AreaCard.tsx
import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Area } from "@/types";

interface AreaCardProps {
  area: Area;
  restaurantId: string;
  onEditClick: () => void;
  onDeleteClick: (restaurantId: string, areaId: string) => void;
}

const AreaCard: React.FC<AreaCardProps> = ({
  area,
  restaurantId,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Card>
      <CardContent className="">
        <h3 className="text-lg font-semibold">{area.name}</h3>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 ">
        <Button asChild size="sm">
          <Link to={`/restaurants/${restaurantId}/areas/${area.id}/canvas`}>
            View Canvas
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link
            to={`/restaurants/${restaurantId}/areas/${area.id}/customer-view`}
          >
            Customer VIew
          </Link>
        </Button>

        <Button variant="outline" size="sm" onClick={onEditClick}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteClick(restaurantId, area.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AreaCard;
