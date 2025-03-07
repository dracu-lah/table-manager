import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { useCanvas } from "../../context/CanvasContext";
import { ElementData } from "../../types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PlusCircle, Save, Trash } from "lucide-react";

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useCanvas();
  const [canvasName, setCanvasName] = useState("");
  const [selectedCanvas, setSelectedCanvas] = useState("default");

  // Add a table to the canvas
  const addTable = (tableType: string) => {
    let elementWidth = 24;
    let elementHeight = 24;
    let color = "bg-amber-700";
    let shape = "rounded-full"; // Default round table

    switch (tableType) {
      case "round":
        color = "bg-amber-700";
        shape = "rounded-full";
        break;
      case "square":
        color = "bg-blue-600";
        shape = "rounded-md";
        break;
      case "rectangular":
        color = "bg-green-600";
        shape = "rounded-md";
        elementWidth = 36;
        elementHeight = 24;
        break;
      case "oval":
        color = "bg-purple-600";
        shape = "rounded-full";
        elementWidth = 36;
        elementHeight = 24;
        break;
    }

    const newElement: ElementData = {
      id: uuidv4(),
      type: "table",
      tableType: tableType,
      position: {
        x: Math.random() * (state.canvasConfig.width - elementWidth),
        y: Math.random() * (state.canvasConfig.height - elementHeight),
      },
      rotation: 0,
      width: elementWidth,
      height: elementHeight,
      color,
      shape,
      canvasId: state.currentCanvasId,
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  // Add other elements to the canvas
  const addElement = (elementType: "window" | "door" | "separator") => {
    let width = 16;
    let height = 16;
    let color = "bg-gray-500";

    switch (elementType) {
      case "window":
        width = 48;
        height = 4;
        color = "bg-blue-500";
        break;
      case "door":
        width = 16;
        height = 8;
        color = "bg-gray-800";
        break;
      case "separator":
        width = 4;
        height = 32;
        color = "bg-gray-400";
        break;
    }

    const newElement: ElementData = {
      id: uuidv4(),
      type: elementType,
      position: {
        x: Math.random() * (state.canvasConfig.width - width),
        y: Math.random() * (state.canvasConfig.height - height),
      },
      rotation: 0,
      width,
      height,
      color,
      canvasId: state.currentCanvasId,
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  // Create a new canvas area
  const createNewCanvas = () => {
    if (!canvasName.trim()) return;

    const newCanvasId = uuidv4();
    dispatch({
      type: "ADD_CANVAS",
      payload: {
        id: newCanvasId,
        name: canvasName,
        config: {
          ...state.canvasConfig,
          // You can set different default sizes for different areas if needed
        },
      },
    });

    setCanvasName("");
    setSelectedCanvas(newCanvasId);
    dispatch({ type: "SET_CURRENT_CANVAS", payload: newCanvasId });
  };

  // Switch between canvases
  const handleCanvasChange = (canvasId: string) => {
    setSelectedCanvas(canvasId);
    dispatch({ type: "SET_CURRENT_CANVAS", payload: canvasId });
  };

  // Delete current canvas
  const deleteCurrentCanvas = () => {
    if (state.canvases.length <= 1) return; // Don't delete the last canvas

    dispatch({ type: "REMOVE_CANVAS", payload: state.currentCanvasId });
    // Switch to the first available canvas
    const nextCanvas = state.canvases.find(
      (c) => c.id !== state.currentCanvasId,
    );
    if (nextCanvas) {
      setSelectedCanvas(nextCanvas.id);
      dispatch({ type: "SET_CURRENT_CANVAS", payload: nextCanvas.id });
    }
  };

  // Save all canvas data
  const saveAllCanvases = () => {
    // The actual saving logic is already in the context useEffect
    // This is just to provide user feedback that saving has occurred
    alert("Floor plan data saved successfully!");
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-sm mb-4">
      <Tabs defaultValue="tables">
        <TabsList className="mb-4">
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="elements">Other Elements</TabsTrigger>
          <TabsTrigger value="canvases">Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => addTable("round")}
              className="flex items-center space-x-2"
            >
              <div className="w-4 h-4 bg-amber-700 rounded-full"></div>
              <span>Round Table</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => addTable("square")}
              className="flex items-center space-x-2"
            >
              <div className="w-4 h-4 bg-blue-600 rounded-md"></div>
              <span>Square Table</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => addTable("rectangular")}
              className="flex items-center space-x-2"
            >
              <div className="w-6 h-4 bg-green-600 rounded-md"></div>
              <span>Rectangular Table</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => addTable("oval")}
              className="flex items-center space-x-2"
            >
              <div className="w-6 h-4 bg-purple-600 rounded-full"></div>
              <span>Oval Table</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="elements" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => addElement("window")}
              className="flex items-center space-x-2"
            >
              <div className="w-6 h-1 bg-blue-500"></div>
              <span>Window</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => addElement("door")}
              className="flex items-center space-x-2"
            >
              <div className="w-4 h-2 bg-gray-800 rounded"></div>
              <span>Door</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => addElement("separator")}
              className="flex items-center space-x-2"
            >
              <div className="w-1 h-6 bg-gray-400"></div>
              <span>Wall/Separator</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="canvases" className="space-y-4">
          <div className="flex items-end space-x-2 mb-4">
            <div className="space-y-2 flex-grow">
              <Label htmlFor="canvasName">New Area Name</Label>
              <Input
                id="canvasName"
                value={canvasName}
                onChange={(e) => setCanvasName(e.target.value)}
                placeholder="Enter name for new area"
              />
            </div>
            <Button onClick={createNewCanvas} className="flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>Create</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canvasSelect">Switch Area</Label>
            <Select value={selectedCanvas} onValueChange={handleCanvasChange}>
              <SelectTrigger id="canvasSelect" className="w-full">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {state.canvases.map((canvas) => (
                  <SelectItem key={canvas.id} value={canvas.id}>
                    {canvas.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 mt-4">
            <Button
              variant="default"
              className="flex items-center"
              onClick={saveAllCanvases}
            >
              <Save className="w-4 h-4 mr-2" />
              <span>Save All Areas</span>
            </Button>

            <Button
              variant="destructive"
              className="flex items-center"
              onClick={deleteCurrentCanvas}
              disabled={state.canvases.length <= 1}
            >
              <Trash className="w-4 h-4 mr-2" />
              <span>Delete Current Area</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
