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

const AreaManager = () => {
  // Areas state
  const [areas, setAreas] = useState([
    { id: "indoor", name: "Indoor", canvasData: {} },
    { id: "outdoor", name: "Outdoor", canvasData: {} },
    { id: "rooftop", name: "Rooftop", canvasData: {} },
    { id: "terrace", name: "Terrace", canvasData: {} },
    { id: "vip-lounge", name: "VIP Lounge", canvasData: {} },
  ]);

  // State for currently selected area
  const [selectedArea, setSelectedArea] = useState(areas[0]);

  // State for new area dialog
  const [isNewAreaDialogOpen, setIsNewAreaDialogOpen] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");

  // State for managing area canvas data
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Handle area selection
  const handleAreaSelect = (area) => {
    if (unsavedChanges) {
      // You might want to add a confirmation dialog here
      if (!confirm("You have unsaved changes. Continue without saving?")) {
        return;
      }
    }
    setSelectedArea(area);
    setUnsavedChanges(false);
  };

  // Handle canvas changes
  const handleCanvasChange = (newCanvasData) => {
    setUnsavedChanges(true);
    // Update the selected area's canvas data
    setSelectedArea({
      ...selectedArea,
      canvasData: newCanvasData,
    });
  };

  // Save current layout
  const saveLayout = () => {
    // Update the area in the areas array
    const updatedAreas = areas.map((area) =>
      area.id === selectedArea.id ? selectedArea : area,
    );
    setAreas(updatedAreas);
    setUnsavedChanges(false);

    // Here you would typically send the data to a backend API
    console.log(
      `Saved layout for ${selectedArea.name}`,
      selectedArea.canvasData,
    );
  };

  // Add new area
  const handleAddArea = () => {
    if (!newAreaName.trim()) return;

    const newArea = {
      id: newAreaName.toLowerCase().replace(/\s+/g, "-"),
      name: newAreaName.trim(),
      canvasData: {},
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

        {/* Area selection section */}
        <Card className="mb-6">
          <CardContent className="">
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
            <Canvas
              isEditable={true}
              initialData={selectedArea.canvasData}
              onChange={handleCanvasChange}
            />
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
