import React from "react";
import { Canvas } from "../components/canvas/Canvas";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

const areas = [
  { id: "indoor", name: "Indoor" },
  { id: "outdoor", name: "Outdoor" },
  { id: "rooftop", name: "Rooftop" },
  { id: "terrace", name: "Terrace" },
  { id: "vip-lounge", name: "VIP Lounge" },
];

const AreaManager: React.FC = () => {
  return (
    <div className="flex overflow-auto py-8">
      <div className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Area Manager</h1>
          <div className="space-x-2">
            <Button asChild>
              <Link to="/customer-view">Preview Customer View</Link>
            </Button>
            <Button variant="outline">Save Layout</Button>
          </div>
        </div>

        {/* Area selection section */}
        <Card className="">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Select Area</h2>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <Button key={area.id} asChild variant="outline">
                  <Link to={`#`}>{area.name}</Link>
                </Button>
              ))}
              <Button asChild variant="default">
                <Link to="#">+ Create New Area</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center">
          <Canvas isEditable={true} />
        </div>
      </div>
    </div>
  );
};

export default AreaManager;
