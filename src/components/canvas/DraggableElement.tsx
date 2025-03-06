import React from "react";
import { motion } from "framer-motion";
import { ElementData } from "../../types";
import { useCanvas } from "../../context/CanvasContext";

interface DraggableElementProps {
  element: ElementData;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  constraintsRef,
}) => {
  const { dispatch, state } = useCanvas();
  const isSelected = state.selectedElement === element.id;

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
      const elementWidth =
        element.type === "table"
          ? 24
          : element.type === "window"
            ? 48
            : element.type === "separator"
              ? 4
              : 16;
      const elementHeight =
        element.type === "table"
          ? 24
          : element.type === "window"
            ? 4
            : element.type === "separator"
              ? 32
              : 16;

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

  const getElementComponent = () => {
    switch (element.type) {
      case "table":
        return (
          <div className="w-24 h-24 bg-amber-700 rounded-full flex flex-col items-center justify-center text-white">
            <div className="font-bold">{element.tableNumber || "?"}</div>
            {element.tableLabel && (
              <div className="text-xs">{element.tableLabel}</div>
            )}
            {element.tableType && (
              <div className="text-xs italic opacity-75">
                {element.tableType}
              </div>
            )}
          </div>
        );
      case "window":
        return <div className="w-48 h-4 bg-blue-500"></div>;
      case "door":
        return <div className="w-16 h-8 bg-gray-800 rounded"></div>;
      case "separator":
        return <div className="w-4 h-32 bg-gray-400"></div>;
      default:
        return <div className="w-16 h-16 bg-gray-500"></div>;
    }
  };

  return (
    <motion.div
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
      {isSelected && (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <button
            onClick={() => handleRotate("counterclockwise")}
            className="p-1 bg-blue-500 text-white rounded-full text-xs"
            title="Rotate counterclockwise"
          >
            ↺
          </button>
          <button
            onClick={() => handleRotate("clockwise")}
            className="p-1 bg-blue-500 text-white rounded-full text-xs"
            title="Rotate clockwise"
          >
            ↻
          </button>
          <button
            onClick={handleDelete}
            className="p-1 bg-red-500 text-white rounded-full text-xs"
            title="Delete"
          >
            ✕
          </button>
        </div>
      )}
    </motion.div>
  );
};
