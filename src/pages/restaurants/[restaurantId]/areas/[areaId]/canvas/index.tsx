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
          restaurantId={`${restaurantId}`}
          areaId={`${areaId}`}
        >
          <Canvas
            restaurantId={restaurantId}
            areaId={areaId}
            isEditable={true}
          />
        </AreaCanvasProvider>
      </div>
    </div>
  );
};

export default AreaCanvasView;
