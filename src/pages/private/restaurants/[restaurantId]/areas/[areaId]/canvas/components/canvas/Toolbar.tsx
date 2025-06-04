import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useAreaCanvas } from "@/context/AreaCanvasContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableIcon, DoorOpen, Minus } from "lucide-react";
import { ElementData } from "@/types";
import TableIcons from "@/utils/assets";

const tableConfigs = [
  // {
  //   type: "hexagon-6",
  //   icon: TableIcons.TableHexagon6Icon,
  //   label: "Hexagon 6",
  //   width: 36,
  //   height: 36,
  //   color: "bg-amber-700",
  //   shape: "rounded-full",
  // },
  // {
  //   type: "oval-6",
  //   icon: TableIcons.TableOval6Icon,
  //   label: "Oval 6",
  //   width: 48,
  //   height: 32,
  //   color: "bg-purple-600",
  //   shape: "rounded-full",
  // },
  // {
  //   type: "oval-8",
  //   icon: TableIcons.TableOval8Icon,
  //   label: "Oval 8",
  //   width: 56,
  //   height: 36,
  //   color: "bg-purple-600",
  //   shape: "rounded-full",
  // },
  {
    type: "rectangle-2",
    icon: TableIcons.TableRectangle2Icon,
    label: "Rectangle 2",
    width: 44,
    height: 64,
    color: "bg-green-600",
    shape: "rounded-md",
  },
  // {
  //   type: "rectangle-4",
  //   icon: TableIcons.TableRectangle4Icon,
  //   label: "Rectangle 4",
  //   width: 32,
  //   height: 32,
  //   color: "bg-green-600",
  //   shape: "rounded-md",
  // },
  {
    type: "rectangle-6",
    icon: TableIcons.TableRectangle6Icon,
    label: "Rectangle 6",
    width: 48,
    height: 32,
    color: "bg-green-600",
    shape: "rounded-md",
  },
  // {
  //   type: "rectangle-8",
  //   icon: TableIcons.TableRectangle8Icon,
  //   label: "Rectangle 8",
  //   width: 64,
  //   height: 32,
  //   color: "bg-green-600",
  //   shape: "rounded-md",
  // },
  // {
  //   type: "round-3",
  //   icon: TableIcons.TableRound3Icon,
  //   label: "Round 3",
  //   width: 24,
  //   height: 24,
  //   color: "bg-amber-700",
  //   shape: "rounded-full",
  // },
  {
    type: "round-6",
    icon: TableIcons.TableRound6Icon,
    label: "Round 6",
    width: 36,
    height: 36,
    color: "bg-amber-700",
    shape: "rounded-full",
  },
  {
    type: "round-8",
    icon: TableIcons.TableRound8Icon,
    label: "Round 8",
    width: 40,
    height: 40,
    color: "bg-amber-700",
    shape: "rounded-full",
  },
  // {
  //   type: "round-9",
  //   icon: TableIcons.TableRound9Icon,
  //   label: "Round 9",
  //   width: 44,
  //   height: 44,
  //   color: "bg-amber-700",
  //   shape: "rounded-full",
  // },
  // {
  //   type: "round-10",
  //   icon: TableIcons.TableRound10Icon,
  //   label: "Round 10",
  //   width: 48,
  //   height: 48,
  //   color: "bg-amber-700",
  //   shape: "rounded-full",
  // },
  {
    type: "square-4",
    icon: TableIcons.TableSquare4Icon,
    label: "Square 4",
    width: 32,
    height: 32,
    color: "bg-blue-600",
    shape: "rounded-md",
  },
];

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useAreaCanvas();

  const addTable = (config: (typeof tableConfigs)[0]) => {
    const width = config.width * 1.8;
    const height = config.height * 1.8;
    const tableElements = state.elements.filter((el) => el.type === "table");
    const nextTableNumber = tableElements.length + 1;

    const newElement: ElementData = {
      id: uuidv4(),
      type: "table",
      tableType: config.type,
      tableNumber: nextTableNumber,
      tableLabel: "",
      tableStatus: "available",
      position: {
        x: Math.random() * (state.canvasConfig.width - width),
        y: Math.random() * (state.canvasConfig.height - height),
      },
      rotation: 0,
      width,
      height,
      color: config.color,
      shape: config.shape,
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  const addElement = (elementType: "window" | "door" | "separator") => {
    let width = 24;
    let height = 24;
    let color = "bg-gray-500";

    if (elementType === "window") {
      width = 64;
      height = 6;
      color = "bg-blue-500";
    } else if (elementType === "door") {
      width = 24;
      height = 12;
      color = "bg-gray-800";
    } else if (elementType === "separator") {
      width = 6;
      height = 48;
      color = "bg-gray-400";
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
        </TabsList>
        <TabsContent value="tables" className="flex space-x-2">
          {tableConfigs.map((config) => (
            <Button
              key={config.type}
              variant="outline"
              onClick={() => addTable(config)}
              className="flex items-center"
            >
              <config.icon className="h-4 w-4 mr-2" />
              {config.label}
            </Button>
          ))}
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
