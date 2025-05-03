// context/AreaCanvasContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ElementData } from "@/types";

// Interfaces remain the same...
export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
  layoutImage?: string;
}
export interface CanvasState {
  elements: ElementData[];
  canvasConfig: CanvasConfig;
  selectedElement: string | null;
  initialElements: ElementData[];
}

const getInitialState = (): CanvasState => ({
  elements: [],
  canvasConfig: { aspectRatio: "1:1", width: 800, height: 800 },
  selectedElement: null,
  initialElements: [],
});

type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_CANVAS_CONFIG"; payload: CanvasConfig }
  | { type: "SET_CANVAS_IMAGE_CONFIG"; payload: string | null }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "RESET_CANVAS" }
  | { type: "SET_INITIAL_ELEMENTS" };

const canvasReducer = (
  state: CanvasState,
  action: CanvasAction,
): CanvasState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      // Check if an element with the same ID already exists
      if (state.elements.some((el) => el.id === action.payload.id)) {
        console.warn(
          `Attempted to add element with duplicate ID: ${action.payload.id}`,
        );
        return state; // Return current state without adding
      }
      return { ...state, elements: [...state.elements, action.payload] };
    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };
    case "REMOVE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload),
        selectedElement:
          state.selectedElement === action.payload
            ? null
            : state.selectedElement,
      };
    case "SET_CANVAS_CONFIG":
      return { ...state, canvasConfig: action.payload };
    case "SET_CANVAS_IMAGE_CONFIG":
      return {
        ...state,
        canvasConfig: {
          ...state.canvasConfig,
          layoutImage: action.payload || "",
        },
      };
    case "SET_SELECTED_ELEMENT":
      return { ...state, selectedElement: action.payload };
    case "RESET_CANVAS":
      return {
        ...state,
        elements: [...state.initialElements],
        selectedElement: null,
      };
    case "SET_INITIAL_ELEMENTS":
      return { ...state, initialElements: [...state.elements] };
    default:
      return state;
  }
};

const AreaCanvasContext = createContext<{
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
} | null>(null);

export const AreaCanvasProvider: React.FC<{
  children: React.ReactNode;
  restaurantId: string;
  areaId: string;
  onTableUpdate?: (table: ElementData) => void;
}> = ({ children, restaurantId, areaId, onTableUpdate }) => {
  const storageKey = `tableLayoutState_${restaurantId}_${areaId}`;
  const [state, dispatch] = useReducer(canvasReducer, getInitialState());

  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // When loading from storage, use ADD_ELEMENT which now has the ID check
        parsed.elements?.forEach((el: ElementData) => {
          dispatch({ type: "ADD_ELEMENT", payload: el });
        });
        setTimeout(() => {
          dispatch({ type: "SET_INITIAL_ELEMENTS" });
        }, 100);
      } catch (err) {
        console.error("Failed to load saved canvas:", err);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (state.elements.length > 0) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ elements: state.elements }),
      );
    } else {
      // If elements become empty, remove the item from local storage
      localStorage.removeItem(storageKey);
    }
  }, [state.elements, storageKey]);

  useEffect(() => {
    if (onTableUpdate) {
      state.elements
        .filter((el) => el.type === "table")
        .forEach((table) => onTableUpdate(table));
    }
  }, [state.elements, onTableUpdate]);

  return (
    <AreaCanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </AreaCanvasContext.Provider>
  );
};

export const useAreaCanvas = () => {
  const context = useContext(AreaCanvasContext);
  if (!context) {
    throw new Error("useAreaCanvas must be used within an AreaCanvasProvider");
  }
  return context;
};
