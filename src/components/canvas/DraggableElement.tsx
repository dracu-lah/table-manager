import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ElementData } from "../../types";
import { useAreaCanvas } from "../../context/AreaCanvasContext";
import { Button } from "../ui/button";
import {
  Edit,
  X,
  RotateCcw,
  RotateCw,
  SeparatorHorizontal,
  SeparatorVertical,
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
import TableIcons from "@/utils/assets";

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
  const { dispatch, state } = useAreaCanvas();
  const isSelected = state.selectedElement === element.id;
  const elementRef = useRef<HTMLDivElement>(null);
  const resizeStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const originalSizeRef = useRef<{ width: number; height: number } | null>(
    null,
  );
  const [isResizing, setIsResizing] = useState(false);

  // Form state for editing tables
  const [tableNumber, setTableNumber] = useState(
    element.tableNumber?.toString() || "",
  );
  const [tableLabel, setTableLabel] = useState(element.tableLabel || "");
  const [tableType, setTableType] = useState(element.tableType || "round-6");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Determine if separator is horizontal (width > height) or vertical (height > width)
  const isHorizontalSeparator =
    element.type === "separator" &&
    (element.width || 0) > (element.height || 0);

  useEffect(() => {
    if (element.type === "table") {
      setTableNumber(element.tableNumber?.toString() || "");
      setTableLabel(element.tableLabel || "");
      setTableType(element.tableType || "round-6");
    }
  }, [element]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => {
    if (!isEditable || isResizing) return;

    let newX = element.position.x + info.offset.x;
    let newY = element.position.y + info.offset.y;

    const canvas = document.querySelector(".canvas-container");
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const elementWidth = element.width || 32;
      const elementHeight = element.height || 32;

      newX = Math.max(0, Math.min(newX, rect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, rect.height - elementHeight));
    }

    const updatedElement = {
      ...element,
      position: { x: newX, y: newY },
    };

    dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isEditable || element.type !== "separator") return;

    e.stopPropagation();
    setIsResizing(true);
    resizeStartPosRef.current = { x: e.clientX, y: e.clientY };
    originalSizeRef.current = {
      width: element.width || 6,
      height: element.height || 48,
    };
  };

  const handleResizeMove = (e: React.MouseEvent) => {
    if (!isResizing || !resizeStartPosRef.current || !originalSizeRef.current)
      return;

    e.stopPropagation();
    e.preventDefault();

    const deltaX = e.clientX - resizeStartPosRef.current.x;
    const deltaY = e.clientY - resizeStartPosRef.current.y;

    let newWidth = originalSizeRef.current.width;
    let newHeight = originalSizeRef.current.height;

    // Only resize width for horizontal separators
    if (isHorizontalSeparator) {
      newWidth = Math.max(6, originalSizeRef.current.width + deltaX);
    }
    // Only resize height for vertical separators
    else {
      newHeight = Math.max(6, originalSizeRef.current.height + deltaY);
    }

    const updatedElement = {
      ...element,
      width: newWidth,
      height: newHeight,
    };

    dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    resizeStartPosRef.current = null;
    originalSizeRef.current = null;
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove as any);
      document.addEventListener("mouseup", handleResizeEnd);

      return () => {
        document.removeEventListener("mousemove", handleResizeMove as any);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing]);

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

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "SET_SELECTED_ELEMENT",
      payload: isSelected ? null : element.id,
    });
    if (element.type === "table" && onTableSelect) {
      onTableSelect(element);
    }
  };

  const handleSaveProperties = () => {
    if (element.type !== "table") return;

    let color = "bg-amber-700"; // Still needed for status indicator compatibility
    let shape = "rounded-full"; // Kept for consistency, though not directly used with SVG
    let width = 32;
    let height = 32;

    switch (tableType) {
      case "hexagon-6":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 36;
        height = 36;
        break;
      case "oval-6":
        color = "bg-purple-600";
        shape = "rounded-full";
        width = 48;
        height = 32;
        break;
      case "oval-8":
        color = "bg-purple-600";
        shape = "rounded-full";
        width = 56;
        height = 36;
        break;
      case "rectangle-2":
        color = "bg-green-600";
        shape = "rounded-md";
        width = 24;
        height = 32;
        break;
      case "rectangle-4":
        color = "bg-green-600";
        shape = "rounded-md";
        width = 32;
        height = 32;
        break;
      case "rectangle-6":
        color = "bg-green-600";
        shape = "rounded-md";
        width = 48;
        height = 32;
        break;
      case "rectangle-8":
        color = "bg-green-600";
        shape = "rounded-md";
        width = 64;
        height = 32;
        break;
      case "round-3":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 24;
        height = 24;
        break;
      case "round-6":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 36;
        height = 36;
        break;
      case "round-8":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 40;
        height = 40;
        break;
      case "round-9":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 44;
        height = 44;
        break;
      case "round-10":
        color = "bg-amber-700";
        shape = "rounded-full";
        width = 48;
        height = 48;
        break;
      case "square-4":
        color = "bg-blue-600";
        shape = "rounded-md";
        width = 32;
        height = 32;
        break;
    }

    const updatedElement = {
      ...element,
      tableNumber: tableNumber ? parseInt(tableNumber, 10) : undefined,
      tableLabel,
      tableType,
      color,
      shape,
      width,
      height,
    };

    dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
    dispatch({ type: "SET_SELECTED_ELEMENT", payload: null });
    setIsPopoverOpen(false);
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
        let tableSvg;
        switch (element.tableType) {
          case "hexagon-6":
            tableSvg = TableIcons.TableHexagon6Icon;
            break;
          case "oval-6":
            tableSvg = TableIcons.TableOval6Icon;
            break;
          case "oval-8":
            tableSvg = TableIcons.TableOval8Icon;
            break;
          case "rectangle-2":
            tableSvg = TableIcons.TableRectangle2Icon;
            break;
          case "rectangle-4":
            tableSvg = TableIcons.TableRectangle4Icon;
            break;
          case "rectangle-6":
            tableSvg = TableIcons.TableRectangle6Icon;
            break;
          case "rectangle-8":
            tableSvg = TableIcons.TableRectangle8Icon;
            break;
          case "round-3":
            tableSvg = TableIcons.TableRound3Icon;
            break;
          case "round-6":
            tableSvg = TableIcons.TableRound6Icon;
            break;
          case "round-8":
            tableSvg = TableIcons.TableRound8Icon;
            break;
          case "round-9":
            tableSvg = TableIcons.TableRound9Icon;
            break;
          case "round-10":
            tableSvg = TableIcons.TableRound10Icon;
            break;
          case "square-4":
            tableSvg = TableIcons.TableSquare4Icon;
            break;
          default:
            tableSvg = TableIcons.TableRound6Icon;
        }
        return (
          <div
            className="relative flex flex-col items-center justify-center"
            style={{
              width: element.width || 32,
              height: element.height || 32,
            }}
          >
            <img
              src={tableSvg}
              draggable={false}
              alt={element.tableType || "table"}
              className="w-full h-full object-contain "
            />
            <div className="absolute text-white font-bold text-center">
              {element.tableNumber || "?"}
              {element.tableLabel && (
                <div className="text-xs">{element.tableLabel}</div>
              )}
            </div>
          </div>
        );
      case "window":
        return (
          <div
            className={element.color || "bg-blue-500"}
            style={{ width: element.width || 64, height: element.height || 6 }}
          ></div>
        );
      case "door":
        return (
          <div
            className={`rounded ${element.color || "bg-gray-800"}`}
            style={{ width: element.width || 24, height: element.height || 12 }}
          ></div>
        );
      case "separator":
        const resizeHandle =
          isSelected && isEditable ? (
            <button
              className={`absolute ${isHorizontalSeparator ? "cursor-col-resize" : "cursor-row-resize"} bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors`}
              style={{
                right: isHorizontalSeparator ? "-10px" : "50%",
                bottom: isHorizontalSeparator ? "50%" : "-10px",
                transform: isHorizontalSeparator
                  ? "translateY(50%)"
                  : "translateX(50%)",
                zIndex: 20,
              }}
              onMouseDown={handleResizeStart}
              onClick={(e) => e.stopPropagation()}
              title={isHorizontalSeparator ? "Resize width" : "Resize height"}
            >
              {isHorizontalSeparator ? (
                <SeparatorVertical className="size-3" />
              ) : (
                <SeparatorHorizontal className="size-3" />
              )}
            </button>
          ) : null;

        return (
          <div className="relative">
            <div
              className={element.color || "bg-gray-400"}
              style={{
                width: element.width || 6,
                height: element.height || 48,
              }}
            ></div>
            {resizeHandle}
          </div>
        );
      default:
        return (
          <div
            className={element.color || "bg-gray-500"}
            style={{ width: element.width || 24, height: element.height || 24 }}
          ></div>
        );
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicks inside Popover from bubbling up
  };

  return (
    <motion.div
      ref={elementRef}
      dragConstraints={constraintsRef}
      className={`absolute ${isEditable && !isResizing ? "cursor-move" : "cursor-default"} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        x: element.position.x,
        y: element.position.y,
        rotate: element.rotation,
        zIndex: isSelected ? 10 : 1,
      }}
      drag={isEditable && !isResizing}
      dragMomentum={false}
      onDragEnd={isEditable && !isResizing ? handleDragEnd : undefined}
      whileDrag={isEditable && !isResizing ? { scale: 1.05 } : undefined}
      onClick={handleSelect}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {getStatusIndicator()}
      {getElementComponent()}

      {isSelected && isEditable && element.type === "table" && (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-blue-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleRotate("counterclockwise");
            }}
            title="Rotate counterclockwise"
          >
            <RotateCcw className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-blue-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleRotate("clockwise");
            }}
            title="Rotate clockwise"
          >
            <RotateCw className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-red-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            title="Delete"
          >
            <X className="size-3" />
          </Button>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="size-6 rounded-full bg-green-500 text-white"
                title="Edit properties"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPopoverOpen(true);
                }}
              >
                <Edit className="size-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" onClick={stopPropagation}>
              <div className="space-y-4 p-2">
                <h3 className="font-semibold">Table Properties</h3>
                <div className="space-y-2">
                  <Label htmlFor="tableType">Table Type</Label>
                  <Select value={tableType} onValueChange={setTableType}>
                    <SelectTrigger id="tableType">
                      <SelectValue placeholder="Select table type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hexagon-6">Hexagon 6</SelectItem>
                      <SelectItem value="oval-6">Oval 6</SelectItem>
                      <SelectItem value="oval-8">Oval 8</SelectItem>
                      <SelectItem value="rectangle-2">Rectangle 2</SelectItem>
                      <SelectItem value="rectangle-4">Rectangle 4</SelectItem>
                      <SelectItem value="rectangle-6">Rectangle 6</SelectItem>
                      <SelectItem value="rectangle-8">Rectangle 8</SelectItem>
                      <SelectItem value="round-3">Round 3</SelectItem>
                      <SelectItem value="round-6">Round 6</SelectItem>
                      <SelectItem value="round-8">Round 8</SelectItem>
                      <SelectItem value="round-9">Round 9</SelectItem>
                      <SelectItem value="round-10">Round 10</SelectItem>
                      <SelectItem value="square-4">Square 4</SelectItem>
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
                    onClick={stopPropagation}
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
                    onClick={stopPropagation}
                    placeholder="E.g. VIP, Reserved"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveProperties();
                    }}
                    className="bg-green-500 text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {isSelected &&
        isEditable &&
        element.type !== "table" &&
        element.type !== "separator" && (
          <div className="absolute -top-8 left-0 flex space-x-1">
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleRotate("counterclockwise");
              }}
              title="Rotate counterclockwise"
            >
              <RotateCcw className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-blue-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleRotate("clockwise");
              }}
              title="Rotate clockwise"
            >
              <RotateCw className="size-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 rounded-full bg-red-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              title="Delete"
            >
              <X className="size-3" />
            </Button>
          </div>
        )}
      {isSelected && isEditable && element.type === "separator" && (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-blue-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleRotate("counterclockwise");
            }}
            title="Rotate counterclockwise"
          >
            <RotateCcw className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-blue-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleRotate("clockwise");
            }}
            title="Rotate clockwise"
          >
            <RotateCw className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-6 rounded-full bg-red-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            title="Delete"
          >
            <X className="size-3" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};
