import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useCanvas } from "../../context/CanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Button } from "../ui/button";
import { ElementData } from "../../types";
import { Toolbar } from "./Toolbar";
import { roomLayouts } from "@/utils/constants";

interface CanvasProps {
  isEditable?: boolean;
  onTableSelect?: (tableData: ElementData) => void;
  tableStatuses?: Record<string, "available" | "occupied" | "reserved">;
}

export const Canvas: React.FC<CanvasProps> = ({
  isEditable = true,
  onTableSelect,
  tableStatuses = {},
}) => {
  const { state, dispatch } = useCanvas();
  const constraintsRef = useRef<HTMLDivElement>(null!);

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
      payload: { aspectRatio: newRatio, width, height },
    });
  };

  const handleLayoutImageChange = (img: string) => {
    dispatch({
      type: "SET_CANVAS_CONFIG",
      payload: { layoutImage: img },
    });
  };
  const handleReset = () => {
    dispatch({ type: "RESET_CANVAS" });
  };

  const elementsWithStatus = state.elements.map((element) => {
    if (element.type === "table" && tableStatuses[element.id]) {
      return { ...element, tableStatus: tableStatuses[element.id] };
    }
    return element;
  });

  return (
    <div className="flex flex-col w-full gap-4">
      {isEditable && <Toolbar />}
      <div className="flex flex-col gap-4 items-center w-full">
        {isEditable && (
          <div className="flex flex-col gap-4">
            <div className="flex space-x-2 self-start">
              <Button
                variant={
                  state.canvasConfig.aspectRatio === "1:1"
                    ? "default"
                    : "outline"
                }
                onClick={() => handleAspectRatioChange("1:1")}
              >
                1:1
              </Button>
              <Button
                variant={
                  state.canvasConfig.aspectRatio === "4:3"
                    ? "default"
                    : "outline"
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
              <Button variant="outline" onClick={handleReset} className="ml-4">
                Reset Layout
              </Button>
            </div>
            <div>
              <div>
                {roomLayouts.map((item, index) => (
                  <Button
                    key={index}
                    className="p-1 roundend lg w-40 h-28"
                    variant={
                      state.canvasConfig.layoutImage === item.img
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleLayoutImageChange(item.img)}
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={item.img}
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className="relative border-2 border-gray-300 bg-gray-100 canvas-container w-full"
          ref={constraintsRef}
          style={{
            backgroundImage: `url(${state.canvasConfig.layoutImage})`,
            width: state.canvasConfig.width,
            height: state.canvasConfig.height,
            maxWidth: "100%",
          }}
        >
          <AnimatePresence>
            {elementsWithStatus.map((element) => (
              <DraggableElement
                constraintsRef={constraintsRef}
                key={element.id}
                element={element}
                isEditable={isEditable}
                onTableSelect={onTableSelect}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
