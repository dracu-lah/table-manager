import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCanvas } from "../../context/CanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ElementData } from "../../types";

interface CanvasProps {
  isEditable?: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ isEditable = true }) => {
  const { state, dispatch } = useCanvas();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedElementData, setSelectedElementData] =
    useState<ElementData | null>(null);
  const [tableNumber, setTableNumber] = useState("");
  const [tableLabel, setTableLabel] = useState("");
  const [tableType, setTableType] = useState("");

  useEffect(() => {
    if (state.selectedElement) {
      const element = state.elements.find(
        (el) => el.id === state.selectedElement,
      );
      if (element) {
        setSelectedElementData(element);
        setTableNumber(element.tableNumber?.toString() || "");
        setTableLabel(element.tableLabel || "");
        setTableType(element.tableType || "");
      }
    } else {
      setSelectedElementData(null);
    }
  }, [state.selectedElement, state.elements]);

  const handleSaveTableProperties = () => {
    if (selectedElementData) {
      const updatedElement = {
        ...selectedElementData,
        tableNumber: tableNumber ? parseInt(tableNumber, 10) : undefined,
        tableLabel,
        tableType,
      };
      dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
    }
    setIsDialogOpen(false);
  };

  const handleAspectRatioChange = (newRatio: string) => {
    let width = 800;
    let height = 800;

    if (newRatio === "4:3") {
      width = 800;
      height = 600;
    } else if (newRatio === "16:9") {
      width = 800;
      height = 450;
    }

    dispatch({
      type: "SET_CANVAS_CONFIG",
      payload: {
        aspectRatio: newRatio,
        width,
        height,
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isEditable && (
        <div className="flex space-x-2 mb-4">
          <Button
            variant={
              state.canvasConfig.aspectRatio === "1:1" ? "default" : "outline"
            }
            onClick={() => handleAspectRatioChange("1:1")}
          >
            1:1
          </Button>
          <Button
            variant={
              state.canvasConfig.aspectRatio === "4:3" ? "default" : "outline"
            }
            onClick={() => handleAspectRatioChange("4:3")}
          >
            4:3
          </Button>
          <Button
            variant={
              state.canvasConfig.aspectRatio === "16:9" ? "default" : "outline"
            }
            onClick={() => handleAspectRatioChange("16:9")}
          >
            16:9
          </Button>
        </div>
      )}

      <div
        className="relative border-2 border-gray-300 bg-gray-100 canvas-container"
        style={{
          width: state.canvasConfig.width,
          height: state.canvasConfig.height,
        }}
      >
        <AnimatePresence>
          {state.elements.map((element) => (
            <DraggableElement key={element.id} element={element} />
          ))}
        </AnimatePresence>
      </div>

      {selectedElementData && selectedElementData.type === "table" && (
        <div className="mt-4">
          <Button onClick={() => setIsDialogOpen(true)}>
            Edit Table Properties
          </Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Table Properties</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Enter table number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableLabel">Table Label</Label>
              <Input
                id="tableLabel"
                type="text"
                value={tableLabel}
                onChange={(e) => setTableLabel(e.target.value)}
                placeholder="Enter table label (e.g. VIP, Reserved)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableType">Table Type</Label>
              <Select value={tableType} onValueChange={setTableType}>
                <SelectTrigger id="tableType">
                  <SelectValue placeholder="Select table type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round">Round</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="rectangular">Rectangular</SelectItem>
                  <SelectItem value="oval">Oval</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveTableProperties}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
