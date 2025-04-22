import React, { useRef, useEffect, useState } from "react";
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
  const constraintsRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Measure available container width on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      if (constraintsRef.current && constraintsRef.current.parentElement) {
        // Get parent container width
        const parentWidth = constraintsRef.current.parentElement.clientWidth;
        setContainerWidth(Math.min(parentWidth, 800)); // Cap at 800px max
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle image change and update dimensions
  const handleLayoutImageChange = (imgSrc: string) => {
    // First, update the image source immediately to show something
    dispatch({
      type: "SET_CANVAS_IMAGE_CONFIG",
      payload: imgSrc,
    });

    // Then calculate and update the aspect ratio
    setIsImageLoading(true);
    const img = new Image();

    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      const calculatedHeight = containerWidth / imgAspectRatio;

      dispatch({
        type: "SET_CANVAS_CONFIG",
        payload: {
          aspectRatio: `${img.width}:${img.height}`,
          width: containerWidth,
          height: calculatedHeight,
          layoutImage: imgSrc, // Set image again here to ensure it stays
        },
      });
      setIsImageLoading(false);
    };

    img.onerror = () => {
      console.error("Failed to load image:", imgSrc);
      setIsImageLoading(false);
    };

    img.src = imgSrc;
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

  // Default canvas dimensions if not yet calculated
  const canvasWidth = state.canvasConfig.width || containerWidth;
  const canvasHeight = state.canvasConfig.height || containerWidth * 0.75; // Default 4:3 aspect ratio

  return (
    <div className="flex flex-col w-full gap-4">
      {isEditable && <Toolbar />}
      <div className="flex flex-col gap-4 items-center w-full">
        {isEditable && (
          <div className="flex flex-col gap-4">
            <div className="flex space-x-2 self-start">
              <Button variant="outline" onClick={handleReset}>
                Reset Layout
              </Button>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {roomLayouts.map((item, index) => (
                  <Button
                    key={index}
                    className="p-[2px] w-40 h-28"
                    variant={
                      state.canvasConfig.layoutImage === item.img
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleLayoutImageChange(item.img)}
                    disabled={isImageLoading}
                  >
                    <img
                      className="w-full h-full rounded-lg object-contain"
                      src={item.img}
                      alt={`Room layout ${index + 1}`}
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className="relative border-2 border-gray-300 bg-gray-100 canvas-container mx-auto"
          ref={constraintsRef}
          style={{
            backgroundImage: state.canvasConfig.layoutImage
              ? `url(${state.canvasConfig.layoutImage})`
              : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: canvasWidth,
            height: canvasHeight,
            maxWidth: "100%",
            transition: "height 0.3s ease-in-out",
            position: "relative",
          }}
        >
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
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
