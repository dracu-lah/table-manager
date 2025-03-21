import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { useCanvas } from "../../context/CanvasContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { TableIcon, Square, DoorOpen, Minus } from "lucide-react";
import { ElementData } from "@/types";

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useCanvas();

  const addTable = (tableType: string) => {
    let elementWidth = 32;
    let elementHeight = 32;
    let color = "bg-amber-700";
    let shape = "rounded-full";

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
        elementWidth = 48;
        elementHeight = 32;
        break;
      case "oval":
        color = "bg-purple-600";
        shape = "rounded-full";
        elementWidth = 48;
        elementHeight = 32;
        break;
    }

    const tableElements = state.elements.filter((el) => el.type === "table");
    const nextTableNumber = tableElements.length + 1;

    const newElement: ElementData = {
      id: uuidv4(),
      type: "table",
      tableType,
      tableNumber: nextTableNumber,
      tableLabel: "",
      tableStatus: "available",
      position: {
        x: Math.random() * (state.canvasConfig.width - elementWidth),
        y: Math.random() * (state.canvasConfig.height - elementHeight),
      },
      rotation: 0,
      width: elementWidth,
      height: elementHeight,
      color,
      shape,
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  const addElement = (elementType: "window" | "door" | "separator") => {
    let width = 24;
    let height = 24;
    let color = "bg-gray-500";

    switch (elementType) {
      case "window":
        width = 64;
        height = 6;
        color = "bg-blue-500";
        break;
      case "door":
        width = 24;
        height = 12;
        color = "bg-gray-800";
        break;
      case "separator":
        width = 6;
        height = 48;
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
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  return (
    <div className="mb-4 w-full overflow-x-auto">
      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="tables">
            <TableIcon className="h-4 w-4 mr-2" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="objects">
            <Square className="h-4 w-4 mr-2" />
            Objects
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tables" className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => addTable("round")}
            className="flex items-center"
          >
            <div className="h-4 w-4 bg-amber-700 rounded-full mr-2"></div>
            Round Table
          </Button>
          <Button
            variant="outline"
            onClick={() => addTable("square")}
            className="flex items-center"
          >
            <div className="h-4 w-4 bg-blue-600 rounded-md mr-2"></div>
            Square Table
          </Button>
          <Button
            variant="outline"
            onClick={() => addTable("rectangular")}
            className="flex items-center"
          >
            <div className="h-4 w-6 bg-green-600 rounded-md mr-2"></div>
            Rectangular Table
          </Button>
          <Button
            variant="outline"
            onClick={() => addTable("oval")}
            className="flex items-center"
          >
            <div className="h-4 w-6 bg-purple-600 rounded-full mr-2"></div>
            Oval Table
          </Button>
        </TabsContent>
        <TabsContent value="objects" className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => addElement("door")}
            className="flex items-center"
          >
            <DoorOpen className="h-4 w-4 mr-2" />
            Door
          </Button>
          <Button
            variant="outline"
            onClick={() => addElement("window")}
            className="flex items-center"
          >
            <Minus className="h-4 w-4 mr-2" />
            Window
          </Button>
          <Button
            variant="outline"
            onClick={() => addElement("separator")}
            className="flex items-center"
          >
            <div className="h-6 w-1 bg-gray-400 mr-2"></div>
            Separator
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};
