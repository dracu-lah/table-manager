import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanvas } from "../../context/CanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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

  useEffect(() => {
    if (state.selectedElement) {
      const element = state.elements.find(
        (el) => el.id === state.selectedElement,
      );
      if (element) {
        setSelectedElementData(element);
        setTableNumber(element.tableNumber?.toString() || "");
      }
    } else {
      setSelectedElementData(null);
    }
  }, [state.selectedElement, state.elements]);

  const handleSaveTableNumber = () => {
    if (selectedElementData && tableNumber) {
      const updatedElement = {
        ...selectedElementData,
        tableNumber: parseInt(tableNumber, 10),
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
        className="relative border-2 border-gray-300 bg-gray-100"
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
            Set Table Number
          </Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Table Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
            />
            <Button onClick={handleSaveTableNumber}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
