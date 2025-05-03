import React, { useState } from "react";
import { Canvas } from "../components/canvas/Canvas";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AreaCanvasProvider, useAreaCanvas } from "@/context/AreaCanvasContext";

const AreaManager = () => {
  const [areas, setAreas] = useState([
    { id: "indoor", name: "Indoor" },
    { id: "outdoor", name: "Outdoor" },
    { id: "rooftop", name: "Rooftop" },
    { id: "terrace", name: "Terrace" },
    { id: "vip-lounge", name: "VIP Lounge" },
  ]);

  const [selectedArea, setSelectedArea] = useState(areas[0]);
  const [isNewAreaDialogOpen, setIsNewAreaDialogOpen] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleAreaSelect = (area) => {
    if (unsavedChanges && !confirm("You have unsaved changes. Continue?")) {
      return;
    }
    setSelectedArea(area);
    setUnsavedChanges(false);
  };

  const saveLayout = () => {
    const { state } = useAreaCanvas(); // get current canvas state
    console.log(`Saved layout for ${selectedArea.name}`, state);
    setUnsavedChanges(false);

    // Optionally persist to backend or sync with `areas` state if needed
  };

  const handleAddArea = () => {
    if (!newAreaName.trim()) return;

    const newArea = {
      id: newAreaName.toLowerCase().replace(/\s+/g, "-"),
      name: newAreaName.trim(),
    };

    setAreas([...areas, newArea]);
    setSelectedArea(newArea);
    setNewAreaName("");
    setIsNewAreaDialogOpen(false);
  };

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
            <Button
              variant="outline"
              onClick={saveLayout}
              disabled={!unsavedChanges}
            >
              {unsavedChanges ? "Save Layout" : "Saved"}
            </Button>
          </div>
        </div>

        {/* Area selection */}
        <Card className="mb-6">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Select Area</h2>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <Button
                  key={area.id}
                  variant={area.id === selectedArea.id ? "default" : "outline"}
                  onClick={() => handleAreaSelect(area)}
                >
                  {area.name}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setIsNewAreaDialogOpen(true)}
              >
                + Create New Area
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas */}
        <div className="flex-1 border rounded-lg p-4 bg-gray-50">
          <div className="text-lg font-semibold mb-2">
            {selectedArea.name} Layout
          </div>
          <div className="flex-1 flex items-center justify-center">
            <AreaCanvasProvider
              restaurantId="demo-restaurant"
              areaId={selectedArea.id}
              onTableUpdate={() => setUnsavedChanges(true)}
            >
              <Canvas
                isEditable={true}
                onChange={() => setUnsavedChanges(true)}
              />
            </AreaCanvasProvider>
          </div>
        </div>
      </div>

      {/* New Area Dialog */}
      <Dialog open={isNewAreaDialogOpen} onOpenChange={setIsNewAreaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Area</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="area-name">Area Name</Label>
            <Input
              id="area-name"
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Enter area name"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAreaDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddArea}>Create Area</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AreaManager;
