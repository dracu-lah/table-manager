import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import { AnimatePresence } from "framer-motion";
import { useAreaCanvas } from "../../context/AreaCanvasContext";
import { DraggableElement } from "./DraggableElement";
import { Button } from "../ui/button";
import { ElementData } from "../../types";
import { Toolbar } from "./Toolbar";
import { roomLayouts } from "@/utils/constants";
import { Input } from "../ui/input";
import { Edit, Save, X, Upload, Trash2 } from "lucide-react";

interface CanvasProps {
  isEditable?: boolean;
  onTableSelect?: (tableData: ElementData) => void;
  tableStatuses?: Record<string, "available" | "occupied" | "reserved">;
  restaurantId?: string; // Add restaurantId and areaId props for saving
  areaId?: string;
}

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
  restaurantId, // Get these from props
  areaId,
}) => {
  const { state, dispatch } = useAreaCanvas();
  const constraintsRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [cornerLabels, setCornerLabels] = useState<CornerLabels>(
    state.canvasConfig.cornerLabels || {
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    },
  );

  const [editingLabel, setEditingLabel] = useState<{
    side: keyof CornerLabels;
    index: number;
  } | null>(null);
  const [editingText, setEditingText] = useState("");

  // Measure available container width on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      if (constraintsRef.current && constraintsRef.current.parentElement) {
        const parentWidth = constraintsRef.current.parentElement.clientWidth;
        setContainerWidth(Math.min(parentWidth, 800));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync local cornerLabels state when context state changes
  useEffect(() => {
    if (
      JSON.stringify(cornerLabels) !==
      JSON.stringify(state.canvasConfig.cornerLabels)
    ) {
      setCornerLabels(
        state.canvasConfig.cornerLabels || {
          top: ["", "", "", ""],
          right: ["", "", "", ""],
          bottom: ["", "", "", ""],
          left: ["", "", "", ""],
        },
      );
    }
  }, [state.canvasConfig.cornerLabels]);

  // Save local corner labels to context whenever they change locally
  useEffect(() => {
    dispatch({
      type: "SET_CANVAS_CONFIG",
      payload: { ...state.canvasConfig, cornerLabels: cornerLabels },
    });
  }, [cornerLabels]);

  // Load default layout image on mount if no layout image is in context state
  useEffect(() => {
    if (state.canvasConfig.layoutImage === undefined) {
      handleLayoutImageChange(roomLayouts[0].img);
    }
  }, [state.canvasConfig.layoutImage, containerWidth]);

  const handleLayoutImageChange = (imgSrc: string) => {
    setIsImageLoading(true);
    const img = new Image();

    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      const calculatedHeight = containerWidth / imgAspectRatio;

      dispatch({
        type: "SET_CANVAS_CONFIG",
        payload: {
          ...state.canvasConfig,
          aspectRatio: `${img.width}:${img.height}`,
          width: containerWidth,
          height: calculatedHeight,
          layoutImage: imgSrc,
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
    setCornerLabels({
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    });
  };

  const handleClearCanvas = () => {
    dispatch({ type: "CLEAR_CANVAS" });
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

  const startEditingLabel = (side: keyof CornerLabels, index: number) => {
    setEditingText(cornerLabels[side][index]);
    setEditingLabel({ side, index });
  };

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

  const cancelEditing = () => {
    setEditingLabel(null);
    setEditingText("");
  };

  // Function to dispatch the SAVE_STATE action
  const handleSaveLayout = () => {
    if (restaurantId && areaId) {
      dispatch({
        type: "SAVE_STATE",
        payload: {
          ...state,
          canvasConfig: {
            ...state.canvasConfig,
            restaurantId: restaurantId, // Include restaurantId and areaId in the state for saving
            areaId: areaId,
          } as any, // Type assertion as these are not strictly in CanvasConfig
        },
      });
      alert("Layout saved!"); // Provide feedback to the user
    } else {
      console.error("Cannot save layout: restaurantId or areaId is missing.");
      alert("Error: Cannot save layout.");
    }
  };

  const elementsWithStatus = useMemo(() => {
    return state.elements.map((element) => {
      if (element.type === "table" && tableStatuses[element.id]) {
        return { ...element, tableStatus: tableStatuses[element.id] };
      }
      return element;
    });
  }, [state.elements, tableStatuses]);

  const canvasWidth = state.canvasConfig.width || containerWidth;
  const canvasHeight = state.canvasConfig.height || containerWidth * 0.75;

  const renderLabelSection = (side: keyof CornerLabels, index: number) => {
    const isEditing =
      editingLabel?.side === side && editingLabel?.index === index;
    const label = cornerLabels[side][index];

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
        className="absolute flex items-center text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        style={positionStyle}
        onClick={() => isEditable && startEditingLabel(side, index)}
      >
        {isEditing ? (
          <div
            className={`flex items-center bg-ghost p-1 rounded border shadow-sm ${side === "right" || side === "left" ? "h-full" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="text-xs px-1 py-0 h-full"
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
                className="h-5 w-5 p-0"
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

      {isEditable && (
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex space-x-2 self-start">
            <Button variant="outline" onClick={handleSaveLayout}>
              {" "}
              {/* Add Save Button */}
              Save Layout
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Layout
            </Button>
            <Button variant="outline" onClick={handleClearCanvas}>
              <Trash2 className="h-4 w-4 mr-2" /> Clear Canvas
            </Button>
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
    </div>
  );
};
