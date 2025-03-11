import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ElementData } from "../../types";
import { useCanvas } from "../../context/CanvasContext";
import { Button } from "../ui/button";
import {
  Edit,
  X,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Check,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DraggableElementProps {
  element: ElementData;
  constraintsRef: React.RefObject<HTMLDivElement>;
  isEditable?: boolean;
  onTableSelect?: (tableData: ElementData) => void;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  constraintsRef,
  isEditable = true,
  onTableSelect,
}) => {
  const { dispatch, state } = useCanvas();
  const isSelected = state.selectedElement === element.id;
  const elementRef = useRef<HTMLDivElement>(null);

  // Form state for editing
  const [tableNumber, setTableNumber] = useState(
    element.tableNumber?.toString() || "",
  );
  const [tableLabel, setTableLabel] = useState(element.tableLabel || "");
  const [tableType, setTableType] = useState(element.tableType || "round");

  // Update form state when selected element changes
  useEffect(() => {
    setTableNumber(element.tableNumber?.toString() || "");
    setTableLabel(element.tableLabel || "");
    setTableType(element.tableType || "round");
  }, [element]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => {
    if (!isEditable) return;

    // Calculate new position
    let newX = element.position.x + info.offset.x;
    let newY = element.position.y + info.offset.y;

    // Get canvas boundaries
    const canvas = document.querySelector(".canvas-container");
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const elementWidth = element.width || 24;
      const elementHeight = element.height || 24;

      // Constrain to canvas
      newX = Math.max(0, Math.min(newX, rect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, rect.height - elementHeight));
    }

    const updatedElement = {
      ...element,
      position: {
        x: newX,
        y: newY,
      },
    };

    dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
  };

  const handleRotate = (direction: "clockwise" | "counterclockwise") => {
    const rotationAmount = direction === "clockwise" ? 90 : -90;
    const updatedElement = {
      ...element,
      rotation: element.rotation + rotationAmount,
    };

    dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
  };

  const handleDelete = () => {
    dispatch({ type: "REMOVE_ELEMENT", payload: element.id });
  };

  const handleSelect = () => {
    dispatch({
      type: "SET_SELECTED_ELEMENT",
      payload: isSelected ? null : element.id,
    });

    if (element.type === "table" && onTableSelect) {
      onTableSelect(element);
    }
  };

  const handleSaveProperties = () => {
    if (element.type === "table") {
      // Determine color and shape based on table type
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
          break;
        case "oval":
          color = "bg-purple-600";
          shape = "rounded-full";
          break;
      }

      const updatedElement = {
        ...element,
        tableNumber: tableNumber ? parseInt(tableNumber, 10) : undefined,
        tableLabel,
        tableType,
        color,
        shape,
      };

      dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
    }
  };

  const handleResize = (direction: string, e: React.MouseEvent) => {
    if (!isEditable) return;

    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width || 24;
    const startHeight = element.height || 24;
    const startPos = { ...element.position };

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      const newPos = { ...startPos };

      // Calculate size changes based on direction
      switch (direction) {
        case "n":
          newHeight = startHeight - (moveEvent.clientY - startY);
          newPos.y = startPos.y + (moveEvent.clientY - startY);
          break;
        case "s":
          newHeight = startHeight + (moveEvent.clientY - startY);
          break;
        case "e":
          newWidth = startWidth + (moveEvent.clientX - startX);
          break;
        case "w":
          newWidth = startWidth - (moveEvent.clientX - startX);
          newPos.x = startPos.x + (moveEvent.clientX - startX);
          break;
        case "ne":
          newWidth = startWidth + (moveEvent.clientX - startX);
          newHeight = startHeight - (moveEvent.clientY - startY);
          newPos.y = startPos.y + (moveEvent.clientY - startY);
          break;
        case "nw":
          newWidth = startWidth - (moveEvent.clientX - startX);
          newHeight = startHeight - (moveEvent.clientY - startY);
          newPos.x = startPos.x + (moveEvent.clientX - startX);
          newPos.y = startPos.y + (moveEvent.clientY - startY);
          break;
        case "se":
          newWidth = startWidth + (moveEvent.clientX - startX);
          newHeight = startHeight + (moveEvent.clientY - startY);
          break;
        case "sw":
          newWidth = startWidth - (moveEvent.clientX - startX);
          newHeight = startHeight + (moveEvent.clientY - startY);
          newPos.x = startPos.x + (moveEvent.clientX - startX);
          break;
      }

      // Enforce minimum size
      newWidth = Math.max(8, newWidth);
      newHeight = Math.max(8, newHeight);

      // Update element
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          ...element,
          width: newWidth,
          height: newHeight,
          position: newPos,
        },
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const getStatusIndicator = () => {
    if (element.type !== "table" || !element.tableStatus) return null;

    let statusColor = "";
    let statusText = "";

    switch (element.tableStatus) {
      case "available":
        statusColor = "bg-green-500";
        statusText = "Available";
        break;
      case "occupied":
        statusColor = "bg-red-500";
        statusText = "Occupied";
        break;
      case "reserved":
        statusColor = "bg-yellow-500";
        statusText = "Reserved";
        break;
    }

    return (
      <div className="absolute -top-6 left-0 flex items-center">
        <div className={`size-3 ${statusColor} rounded-full mr-1`}></div>
        <span className="text-xs font-medium">{statusText}</span>
      </div>
    );
  };

  const getElementComponent = () => {
    switch (element.type) {
      case "table":
        return (
          <div
            className={`flex flex-col items-center justify-center text-white ${element.color || "bg-amber-700"} ${element.shape || "rounded-full"}`}
            style={{
              width: element.width || 24,
              height: element.height || 24,
            }}
          >
            <div className="font-bold">{element.tableNumber || "?"}</div>
            {element.tableLabel && (
              <div className="text-xs">{element.tableLabel}</div>
            )}
            <div className="text-xs italic opacity-75">
              {element.tableType || "table"}
            </div>
          </div>
        );
      case "window":
        return (
          <div
            className={element.color || "bg-blue-500"}
            style={{
              width: element.width || 48,
              height: element.height || 4,
            }}
          ></div>
        );
      case "door":
        return (
          <div
            className={`rounded ${element.color || "bg-gray-800"}`}
            style={{
              width: element.width || 16,
              height: element.height || 8,
            }}
          ></div>
        );
      case "separator":
        return (
          <div
            className={element.color || "bg-gray-400"}
            style={{
              width: element.width || 4,
              height: element.height || 32,
            }}
          ></div>
        );
      default:
        return (
          <div
            className={element.color || "bg-gray-500"}
            style={{
              width: element.width || 16,
              height: element.height || 16,
            }}
          ></div>
        );
    }
  };

  return (
    <motion.div
      ref={elementRef}
      dragConstraints={constraintsRef}
      className={`absolute ${isEditable ? "cursor-move" : "cursor-default"} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        x: element.position.x,
        y: element.position.y,
        rotate: element.rotation,
        zIndex: isSelected ? 10 : 1,
      }}
      drag={isEditable}
      dragMomentum={false}
      onDragEnd={isEditable ? handleDragEnd : undefined}
      whileDrag={isEditable ? { scale: 1.05 } : undefined}
      onClick={handleSelect}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {getStatusIndicator()}
      {getElementComponent()}

      {/* Element editing controls - only visible when selected and editable */}
      {isSelected && isEditable && (
        <>
          {/* Control buttons */}
          <div className="absolute -top-8 left-0 flex space-x-1">
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={() => handleRotate("counterclockwise")}
              title="Rotate counterclockwise"
            >
              <RotateCcw className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={() => handleRotate("clockwise")}
              title="Rotate clockwise"
            >
              <RotateCw className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-red-500 text-white"
              onClick={handleDelete}
              title="Delete"
            >
              <X className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={() => {
                dispatch({
                  type: "UPDATE_ELEMENT",
                  payload: {
                    ...element,
                    width: (element.width || 24) * 1.2,
                    height: (element.height || 24) * 1.2,
                  },
                });
              }}
              title="Enlarge"
            >
              <Maximize className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={() => {
                dispatch({
                  type: "UPDATE_ELEMENT",
                  payload: {
                    ...element,
                    width: Math.max(8, (element.width || 24) * 0.8),
                    height: Math.max(8, (element.height || 24) * 0.8),
                  },
                });
              }}
              title="Reduce"
            >
              <Minimize className="size-3" />
            </Button>

            {/* In-element properties edit popover */}
            {element.type === "table" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-6 rounded-full bg-green-500 text-white"
                    title="Edit properties"
                  >
                    <Edit className="size-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4 p-2">
                    <h3 className="font-semibold">Table Properties</h3>

                    <div className="space-y-2">
                      <Label htmlFor="tableType">Table Type</Label>
                      <Select value={tableType} onValueChange={setTableType}>
                        <SelectTrigger id="tableType">
                          <SelectValue placeholder="Select table type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round">Round</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="rectangular">
                            Rectangular
                          </SelectItem>
                          <SelectItem value="oval">Oval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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
                        placeholder="E.g. VIP, Reserved"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        onClick={handleSaveProperties}
                        className="bg-green-500 text-white"
                      >
                        <Check className="size-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Resize handles */}
          <div
            className="absolute -top-1 -left-1 size-3 bg-white border border-blue-500 rounded-full cursor-nwse-resize"
            onMouseDown={(e) => handleResize("nw", e)}
          />
          <div
            className="absolute -top-1 -right-1 size-3 bg-white border border-blue-500 rounded-full cursor-nesw-resize"
            onMouseDown={(e) => handleResize("ne", e)}
          />
          <div
            className="absolute -bottom-1 -left-1 size-3 bg-white border border-blue-500 rounded-full cursor-nesw-resize"
            onMouseDown={(e) => handleResize("sw", e)}
          />
          <div
            className="absolute -bottom-1 -right-1 size-3 bg-white border border-blue-500 rounded-full cursor-nwse-resize"
            onMouseDown={(e) => handleResize("se", e)}
          />

          {/* Edge resize handles */}
          <div
            className="absolute top-1/2 -left-1 size-3 bg-white border border-blue-500 rounded-full cursor-ew-resize -translate-y-1/2"
            onMouseDown={(e) => handleResize("w", e)}
          />
          <div
            className="absolute top-1/2 -right-1 size-3 bg-white border border-blue-500 rounded-full cursor-ew-resize -translate-y-1/2"
            onMouseDown={(e) => handleResize("e", e)}
          />
          <div
            className="absolute -top-1 left-1/2 size-3 bg-white border border-blue-500 rounded-full cursor-ns-resize -translate-x-1/2"
            onMouseDown={(e) => handleResize("n", e)}
          />
          <div
            className="absolute -bottom-1 left-1/2 size-3 bg-white border border-blue-500 rounded-full cursor-ns-resize -translate-x-1/2"
            onMouseDown={(e) => handleResize("s", e)}
          />
        </>
      )}
    </motion.div>
  );
};
