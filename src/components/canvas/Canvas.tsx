import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { useAreaCanvas } from "../../context/AreaCanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Button } from "../ui/button";
import { ElementData } from "../../types";
import { Toolbar } from "./Toolbar";
import { roomLayouts } from "@/utils/constants";
import { Input } from "../ui/input";
import { Edit, Save, X, Upload, Trash2 } from "lucide-react"; // Import Trash2 icon

interface CanvasProps {
  isEditable?: boolean;
  onTableSelect?: (tableData: ElementData) => void;
  tableStatuses?: Record<string, "available" | "occupied" | "reserved">;
}

// Define a type for corner labels
interface CornerLabels {
  top: string[];
  right: string[];
  bottom: string[];
  left: string[];
}

export const Canvas: React.FC<CanvasProps> = ({
  isEditable = true,
  onTableSelect,
  tableStatuses = {},
}) => {
  const { state, dispatch } = useAreaCanvas();
  const constraintsRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Corner labels state (4 sections for each side)
  // Initialize with state values if they exist in context
  const [cornerLabels, setCornerLabels] = useState<CornerLabels>(
    state.canvasConfig.cornerLabels || {
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    },
  );

  // State to manage which label is being edited
  const [editingLabel, setEditingLabel] = useState<{
    side: keyof CornerLabels;
    index: number;
  } | null>(null);
  // Temporary state for the currently edited label text
  const [editingText, setEditingText] = useState("");

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

  // Update local cornerLabels state when context state changes (e.g., on initial load)
  useEffect(() => {
    if (state.canvasConfig.cornerLabels) {
      setCornerLabels(state.canvasConfig.cornerLabels);
    }
  }, [state.canvasConfig.cornerLabels]);

  // Save corner labels to context whenever they change
  useEffect(() => {
    dispatch({
      type: "SET_CANVAS_CONFIG",
      payload: { ...state.canvasConfig, cornerLabels: cornerLabels },
    });
  }, [cornerLabels, dispatch, state.canvasConfig]); // Added dispatch and state.canvasConfig to dependencies

  // Load default layout image on mount if no layout image is in context state
  useEffect(() => {
    if (!state.canvasConfig.layoutImage) {
      handleLayoutImageChange(roomLayouts[0].img);
    }
  }, [state.canvasConfig.layoutImage]); // Added state.canvasConfig.layoutImage to dependencies

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
          ...state.canvasConfig, // Preserve other canvas config properties
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
      // Optionally, set a default image or indicate an error visually
    };

    img.src = imgSrc;
  };

  const handleReset = () => {
    dispatch({ type: "RESET_CANVAS" });
    // Reset local corner labels state to default as well
    setCornerLabels({
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    });
    // The canvas config including layoutImage will be reset by the context reducer
  };

  const handleClearCanvas = () => {
    dispatch({ type: "CLEAR_CANVAS" }); // Dispatch the new CLEAR_CANVAS action
    // Also reset local corner labels state to default
    setCornerLabels({
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    });
  };

  // Handle file upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleLayoutImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to start editing a label
  const startEditingLabel = (side: keyof CornerLabels, index: number) => {
    setEditingText(cornerLabels[side][index]);
    setEditingLabel({ side, index });
  };

  // Function to save the edited label
  const saveEditedLabel = () => {
    if (editingLabel) {
      const { side, index } = editingLabel;
      setCornerLabels((prev) => {
        const updatedLabels = { ...prev };
        const sideLabels = [...updatedLabels[side]];
        sideLabels[index] = editingText;
        updatedLabels[side] = sideLabels;
        return updatedLabels;
      });
      setEditingLabel(null);
    }
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingLabel(null);
    setEditingText("");
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

  // Render a label section
  const renderLabelSection = (side: keyof CornerLabels, index: number) => {
    const isEditing =
      editingLabel?.side === side && editingLabel?.index === index;
    const label = cornerLabels[side][index];

    // Determine position styles based on side
    let positionStyle: React.CSSProperties = {};

    switch (side) {
      case "top":
        positionStyle = {
          width: `${canvasWidth / 4}px`,
          height: "20px",
          top: "-25px",
          left: `${(index * canvasWidth) / 4}px`,
          justifyContent: "center",
        };
        break;
      case "right":
        positionStyle = {
          width: "20px",
          height: `${canvasHeight / 4}px`,
          top: `${(index * canvasHeight) / 4}px`,
          right: "-25px",
          justifyContent: "center",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        };
        break;
      case "bottom":
        positionStyle = {
          width: `${canvasWidth / 4}px`,
          height: "20px",
          bottom: "-25px",
          left: `${(index * canvasWidth) / 4}px`,
          justifyContent: "center",
        };
        break;
      case "left":
        positionStyle = {
          width: "20px",
          height: `${canvasHeight / 4}px`,
          top: `${(index * canvasHeight) / 4}px`,
          left: "-25px",
          justifyContent: "center",
          writingMode: "vertical-lr",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        };
        break;
    }

    return (
      <div
        key={`${side}-${index}`}
        className="absolute flex items-center text-xs   text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        style={positionStyle}
        onClick={() => isEditable && startEditingLabel(side, index)}
      >
        {isEditing ? (
          <div
            className={`flex items-center bg-ghost  p-1 rounded  border shadow-sm ${side === "right" || side === "left" ? "h-full" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="text-xs px-1 py-0 h-full "
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEditedLabel();
                if (e.key === "Escape") cancelEditing();
              }}
            />
            <div className="flex gap-1 ml-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-5 w-5 p-0 "
                onClick={(e) => {
                  e.stopPropagation();
                  saveEditedLabel();
                }}
              >
                <Save className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-5 w-5 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelEditing();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span>{label || (isEditable ? "Click to add label" : "")}</span>
            {isEditable && label && (
              <Edit className="h-3 w-3 opacity-50 hover:opacity-100" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {isEditable && <Toolbar />}
      <div className="flex flex-col gap-4 items-center w-full">
        {isEditable && (
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex space-x-2 self-start">
              <Button variant="outline" onClick={handleReset}>
                Reset Layout
              </Button>
              <Button variant="outline" onClick={handleClearCanvas}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear Canvas
              </Button>
              {/* Custom Image Upload Button */}
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload Custom Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="">
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
          className="relative border-2 border-gray-300 bg-gray-100 canvas-container mx-auto "
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
          {/* Corner labels */}
          {[0, 1, 2, 3].map((index) => renderLabelSection("top", index))}
          {[0, 1, 2, 3].map((index) => renderLabelSection("right", index))}
          {[0, 1, 2, 3].map((index) => renderLabelSection("bottom", index))}
          {[0, 1, 2, 3].map((index) => renderLabelSection("left", index))}

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

        {/* Optional: Add a section for corner label management if needed */}
        {isEditable && (
          <div className="w-full max-w-3xl mt-4">
            <div className="text-sm text-gray-500">
              <p>
                Click on any label around the room layout to add or edit text.
                Labels help indicate areas outside the room.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
