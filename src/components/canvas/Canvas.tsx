import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCanvas } from "../../context/CanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ElementData } from "../../types";
import { Toolbar } from "./Toolbar";

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

  const constraintsRef = useRef(null);

  // Find the current canvas
  const currentCanvas =
    state.canvases.find((canvas) => canvas.id === state.currentCanvasId) ||
    state.canvases[0];

  useEffect(() => {
    if (state.selectedElement) {
      const element = state.elements.find(
        (el) => el.id === state.selectedElement,
      );
      if (element) {
        setSelectedElementData(element);
        setTableNumber(element.tableNumber?.toString() || "");
        setTableLabel(element.tableLabel || "");
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
      };
      dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
    }
    setIsDialogOpen(false);
  };

  const handleAspectRatioChange = (newRatio: string) => {
    let width = 600;
    let height = 600;

    if (newRatio === "4:3") {
      width = 600;
      height = 450;
    } else if (newRatio === "16:9") {
      width = 600;
      height = 338;
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
    <div className="flex  items-start gap-4 w-full">
      {isEditable && <Toolbar />}

      <div className="flex flex-col-reverse gap-4 items-center w-full">
        <h2 className="text-xl font-bold mb-2">{currentCanvas.name}</h2>

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
                state.canvasConfig.aspectRatio === "16:9"
                  ? "default"
                  : "outline"
              }
              onClick={() => handleAspectRatioChange("16:9")}
            >
              16:9
            </Button>
          </div>
        )}

        <div
          className="relative border-2 border-gray-300 bg-gray-100 canvas-container"
          ref={constraintsRef}
          style={{
            width: state.canvasConfig.width,
            height: state.canvasConfig.height,
          }}
        >
          <AnimatePresence>
            {state.elements
              .filter((el) => el.canvasId === state.currentCanvasId)
              .map((element) => (
                <DraggableElement
                  constraintsRef={constraintsRef}
                  key={element.id}
                  element={element}
                />
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
      </div>

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

            <Button onClick={handleSaveTableProperties}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
