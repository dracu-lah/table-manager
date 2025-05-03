// src/pages/AreaCanvasView.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AreaCanvasProvider } from "@/context/AreaCanvasContext";
import { Canvas } from "@/components/canvas/Canvas";

const AreaCanvasView: React.FC = () => {
  const { restaurantId, areaId } = useParams<{
    restaurantId: string;
    areaId: string;
  }>();
  const navigate = useNavigate();

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  // In a real application, fetch the specific area and its tables using restaurantId and areaId
  // const [area, setArea] = useState<Area | null>(null);
  // useEffect(() => {
  //   // Fetch area data
  // }, [restaurantId, areaId]);

  return (
    <div className="container mx-auto py-8">
      <Button
        onClick={() => navigate(`/restaurants/${restaurantId}`)}
        className="mb-6"
      >
        Back to Restaurant Details
      </Button>
      <h1 className="text-3xl font-bold mb-6">Area Canvas View</h1>
      <p>
        Restaurant ID: {restaurantId}, Area ID: {areaId}
      </p>

      {/* Implement your table management canvas here */}
      <div className="">
        <AreaCanvasProvider
          restaurantId={restaurantId}
          areaId={areaId}
          onTableUpdate={() => setUnsavedChanges(true)}
        >
          <Canvas isEditable={true} onChange={() => setUnsavedChanges(true)} />
        </AreaCanvasProvider>
      </div>
    </div>
  );
};

export default AreaCanvasView;
