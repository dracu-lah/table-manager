import { useParams } from "react-router";
import { ZoneCanvasProvider } from "@/context/ZoneCanvasContext";
import { Canvas } from "./components/canvas/Canvas";

const ZoneCanvasViewPage: React.FC = () => {
  const { propertyId, zoneId } = useParams<{
    propertyId: string;
    zoneId: string;
  }>();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Zone Canvas View</h1>
      <p>
        Property ID: {propertyId}, Zone ID: {zoneId}
      </p>

      {/* Implement your table management canvas here */}
      <div className="">
        <ZoneCanvasProvider
          propertyId={`${propertyId}`}
          zoneId={`${zoneId}`}
        >
          <Canvas
            propertyId={propertyId}
            zoneId={zoneId}
            isEditable={true}
          />
        </ZoneCanvasProvider>
      </div>
    </div>
  );
};

export default ZoneCanvasViewPage;
