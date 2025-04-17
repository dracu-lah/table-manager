import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { useCanvas } from "../../context/CanvasContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { TableIcon, Square, DoorOpen, Minus } from "lucide-react";
import { ElementData } from "@/types";
import TableIcons from "@/utils/assets";

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useCanvas();

  const addTable = (tableType: string) => {
    let elementWidth = 32;
    let elementHeight = 32;
    let color = "bg-amber-700";
    let shape = "rounded-full";

    switch (tableType) {
      case "hexagon-6":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 36;
        elementHeight = 36;
        break;
      case "oval-6":
        color = "bg-purple-600";
        shape = "rounded-full";
        elementWidth = 48;
        elementHeight = 32;
        break;
      case "oval-8":
        color = "bg-purple-600";
        shape = "rounded-full";
        elementWidth = 56;
        elementHeight = 36;
        break;
      case "rectangle-2":
        color = "bg-green-600";
        shape = "rounded-md";
        elementWidth = 24;
        elementHeight = 32;
        break;
      case "rectangle-4":
        color = "bg-green-600";
        shape = "rounded-md";
        elementWidth = 32;
        elementHeight = 32;
        break;
      case "rectangle-6":
        color = "bg-green-600";
        shape = "rounded-md";
        elementWidth = 48;
        elementHeight = 32;
        break;
      case "rectangle-8":
        color = "bg-green-600";
        shape = "rounded-md";
        elementWidth = 64;
        elementHeight = 32;
        break;
      case "round-3":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 24;
        elementHeight = 24;
        break;
      case "round-6":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 36;
        elementHeight = 36;
        break;
      case "round-8":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 40;
        elementHeight = 40;
        break;
      case "round-9":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 44;
        elementHeight = 44;
        break;
      case "round-10":
        color = "bg-amber-700";
        shape = "rounded-full";
        elementWidth = 48;
        elementHeight = 48;
        break;
      case "square-4":
        color = "bg-blue-600";
        shape = "rounded-md";
        elementWidth = 32;
        elementHeight = 32;
        break;
    }
    elementWidth *= 1.8;
    elementHeight *= 1.8;
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
          <Button variant="outline" onClick={() => addTable("hexagon-6")}>
            <img
              src={TableIcons.TableHexagon6Icon}
              alt="Hexagon 6"
              className="h-4 w-4 mr-2"
            />
            Hexagon 6
          </Button>
          <Button variant="outline" onClick={() => addTable("oval-6")}>
            <img
              src={TableIcons.TableOval6Icon}
              alt="Oval 6"
              className="h-4 w-4 mr-2"
            />
            Oval 6
          </Button>
          <Button variant="outline" onClick={() => addTable("oval-8")}>
            <img
              src={TableIcons.TableOval8Icon}
              alt="Oval 8"
              className="h-4 w-4 mr-2"
            />
            Oval 8
          </Button>
          <Button variant="outline" onClick={() => addTable("rectangle-2")}>
            <img
              src={TableIcons.TableRectangle2Icon}
              alt="Rectangle 2"
              className="h-4 w-4 mr-2"
            />
            Rectangle 2
          </Button>
          <Button variant="outline" onClick={() => addTable("rectangle-4")}>
            <img
              src={TableIcons.TableRectangle4Icon}
              alt="Rectangle 4"
              className="h-4 w-4 mr-2"
            />
            Rectangle 4
          </Button>
          <Button variant="outline" onClick={() => addTable("rectangle-6")}>
            <img
              src={TableIcons.TableRectangle6Icon}
              alt="Rectangle 6"
              className="h-4 w-4 mr-2"
            />
            Rectangle 6
          </Button>
          <Button variant="outline" onClick={() => addTable("rectangle-8")}>
            <img
              src={TableIcons.TableRectangle8Icon}
              alt="Rectangle 8"
              className="h-4 w-4 mr-2"
            />
            Rectangle 8
          </Button>
          <Button variant="outline" onClick={() => addTable("round-3")}>
            <img
              src={TableIcons.TableRound3Icon}
              alt="Round 3"
              className="h-4 w-4 mr-2"
            />
            Round 3
          </Button>
          <Button variant="outline" onClick={() => addTable("round-6")}>
            <img
              src={TableIcons.TableRound6Icon}
              alt="Round 6"
              className="h-4 w-4 mr-2"
            />
            Round 6
          </Button>
          <Button variant="outline" onClick={() => addTable("round-8")}>
            <img
              src={TableIcons.TableRound8Icon}
              alt="Round 8"
              className="h-4 w-4 mr-2"
            />
            Round 8
          </Button>
          <Button variant="outline" onClick={() => addTable("round-9")}>
            <img
              src={TableIcons.TableRound9Icon}
              alt="Round 9"
              className="h-4 w-4 mr-2"
            />
            Round 9
          </Button>
          <Button variant="outline" onClick={() => addTable("round-10")}>
            <img
              src={TableIcons.TableRound10Icon}
              alt="Round 10"
              className="h-4 w-4 mr-2"
            />
            Round 10
          </Button>
          <Button variant="outline" onClick={() => addTable("square-4")}>
            <img
              src={TableIcons.TableSquare4Icon}
              alt="Square 4"
              className="h-4 w-4 mr-2"
            />
            Square 4
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
