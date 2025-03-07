import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ElementData } from "../../types";
import { useCanvas } from "../../context/CanvasContext";

interface DraggableElementProps {
  element: ElementData;
  constraintsRef: React.RefObject<HTMLDivElement>;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  constraintsRef,
}) => {
  const { dispatch, state } = useCanvas();
  const isSelected = state.selectedElement === element.id;
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => {
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
  };

  const handleResize = (direction: string, e: React.MouseEvent) => {
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

  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    if (!isSelected) return;

    // Shift + + to enlarge
    if (e.shiftKey && e.key === "+") {
      e.preventDefault();
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          ...element,
          width: (element.width || 24) * 1.1,
          height: (element.height || 24) * 1.1,
        },
      });
    }

    // Shift + - to reduce
    if (e.shiftKey && e.key === "-") {
      e.preventDefault();
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          ...element,
          width: Math.max(8, (element.width || 24) * 0.9),
          height: Math.max(8, (element.height || 24) * 0.9),
        },
      });
    }

    // Arrow keys for precise positioning
    if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      const moveAmount = e.shiftKey ? 10 : 1;
      const newPos = { ...element.position };

      switch (e.key) {
        case "ArrowUp":
          newPos.y -= moveAmount;
          break;
        case "ArrowDown":
          newPos.y += moveAmount;
          break;
        case "ArrowLeft":
          newPos.x -= moveAmount;
          break;
        case "ArrowRight":
          newPos.x += moveAmount;
          break;
      }

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          ...element,
          position: newPos,
        },
      });
    }
  };

  useEffect(() => {
    if (isSelected) {
      document.addEventListener("keydown", handleKeyboardShortcuts);
      return () => {
        document.removeEventListener("keydown", handleKeyboardShortcuts);
      };
    }
  }, [isSelected, element]);

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

  // Don't render if element doesn't belong to current canvas
  if (element.canvasId !== state.currentCanvasId) {
    return null;
  }

  return (
    <motion.div
      ref={elementRef}
      dragConstraints={constraintsRef}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        x: element.position.x,
        y: element.position.y,
        rotate: element.rotation,
        zIndex: isSelected ? 10 : 1,
      }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      onClick={handleSelect}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {getElementComponent()}

      {/* Control buttons */}
      {isSelected && (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <button
            onClick={() => handleRotate("counterclockwise")}
            className="size-6 bg-blue-500 text-white rounded-full text-xs"
            title="Rotate counterclockwise"
          >
            ↺
          </button>
          <button
            onClick={() => handleRotate("clockwise")}
            className="size-6 bg-blue-500 text-white rounded-full text-xs"
            title="Rotate clockwise"
          >
            ↻
          </button>
          <button
            onClick={handleDelete}
            className="size-6 bg-red-500 text-white rounded-full text-xs"
            title="Delete"
          >
            ✕
          </button>
          <button
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
            className="size-6 bg-blue-500 text-white rounded-full text-xs"
            title="Enlarge (Shift++)"
          >
            +
          </button>
          <button
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
            className="size-6 bg-blue-500 text-white rounded-full text-xs"
            title="Reduce (Shift+-)"
          >
            -
          </button>
        </div>
      )}

      {/* Resize handles */}
      {isSelected && (
        <>
          {/* Corner resize handles */}
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
