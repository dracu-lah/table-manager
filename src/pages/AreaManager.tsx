import React from "react";
import { Canvas } from "../components/canvas/Canvas";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const AreaManager: React.FC = () => {
  return (
    <div className="flex  overflow-auto py-8">
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Area Manager</h1>
          <div className="space-x-2">
            <Button asChild>
              <Link to="/customer-view">Preview Customer View</Link>
            </Button>
            <Button variant="outline">Save Layout</Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Canvas isEditable={true} />
        </div>
      </div>
    </div>
  );
};

export default AreaManager;
